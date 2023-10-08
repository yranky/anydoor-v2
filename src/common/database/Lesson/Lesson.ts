/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:14:20
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-10-08 20:56:13
 * @FilePath: \anydoor-v2\src\common\database\Lesson\Lesson.ts
 * @Description: 课程数据获取类
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { flatten } from "lodash"
import ERROR_TARGET from "../../errorHandler/ERROR_TARGET"
import SQLite, { SQLITE_STATUS_CODE } from "../../sql/SQLite"
import databases, { DATA } from "../database"
import { LESSON_TABLES_NAME } from "../tables/lesson"
import { ILessonItemsResult, ILessonNameItem, ILessonTempItemResult, ISemesterItem, LESSON_BACKGROUND_TYPE, LESSON_EDIT_TYPE } from "./ILesson"
import { Filter_ILessonName, Filter_ILessonTempResult, Filter_ISemester, mergeItem } from "./lesson_filters"
import { classnumsToArray, rangeToSequence, sequenceToRange, weeksToArray } from "./lesson_temp_utils"
import ToastModule from "@/common/native/toast/ToastModule"
import Encrypt from "@/common/encrypt/Encrypt"
import useJiaowuStore from "@/store/jiaowu"
import { jwConfig, jwTimetable } from "@/common/service/jw"
import CODE from "@/common/define/code"
import { useLessonStore } from "@/store/lesson"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { getFiles, getFileInfo } from "@/common/utils/ioUtils"
import SETTING_TABLES, { SETTING_TABLES_NAME } from "../tables/setting"
import { UNI_STORAGE } from "../UNI_STORAGE"

export default class Lesson {
    //sqlite对象
    private sql: SQLite | undefined
    //构造函数
    private constructor() { }

    //获取实例对象
    static async getInstance() {
        if (uni.$anydoor.Lesson === undefined) {
            uni.$anydoor.Lesson = new Lesson()
            //初始化工作
            uni.$anydoor.Lesson.sql = new SQLite(DATA.LESSON)
            //需要等待完成才能
            await uni.$anydoor.Lesson.initDataTable()
        }
        return uni.$anydoor.Lesson
    }

    //初始化课程数据
    async initDataTable() {
        return await this.sql!.executeSql([
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.TEMP].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.NAME].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.RECORDS].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.SEMESTER].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.TIME].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.EDIT].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.BACKGROUND].init,
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.THEME].init
        ], ERROR_TARGET.LESSON_CLASS)
    }

    //更新学期信息(获取数据之后的批量更新操作)
    async updateSemester(data: ISemesterItem[], company_id: string, getUpdated: boolean = true): Promise<ISemesterItem[]> {
        if (!(data instanceof Array)) return []
        //先查询已有的学期
        // const res = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.SEMESTER}`, ERROR_TARGET.LESSON_CLASS)
        // //学期数据
        // let semester_data: ISemesterItem[] = []
        // if (res && res?.code === SQLITE_STATUS_CODE.SUCCESS) {
        //     semester_data = Filter_ISemester(res.data) as ISemesterItem[]
        // }
        await this.sql?.executeSql([
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.SEMESTER].drop || '',
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.SEMESTER].init,
        ])
        //比对，并生成sql
        const sqls: string[] = data.map((item: ISemesterItem) => {
            //如果已经存在，则进行更新
            // const disUnique: ISemesterItem | undefined = semester_data.find((s_item: ISemesterItem) => s_item.name === item.name && s_item.company_id === company_id)
            // if (disUnique) {
            //     const filter_item: ISemesterItem = Filter_ISemester(mergeItem(disUnique, item)) as ISemesterItem
            //     return `
            //     update  ${LESSON_TABLES_NAME.SEMESTER} set name='${filter_item.name}',ext = '${encodeURIComponent(JSON.stringify(filter_item.ext))}' where id='${filter_item.id}'
            //     `
            // } else {
            const filter_item: ISemesterItem = Filter_ISemester(item) as ISemesterItem
            return `
                insert into ${LESSON_TABLES_NAME.SEMESTER} (name,tag,ext,company_id) values ('${filter_item.name}','${filter_item.tag}','${encodeURIComponent(JSON.stringify(filter_item.ext))}','${company_id}')
                `
            // }
        })
        //执行sql语句
        const res_update = await this.sql?.executeSql(sqls, ERROR_TARGET.LESSON_CLASS)
        if (res_update?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "学期信息更新失败!(数据错误)" })
        }
        //如果不需要更新这个
        if (!getUpdated) return []
        //最终信息
        const last_result = await this.getSemester()
        return Filter_ISemester(last_result?.data || []) as ISemesterItem[]
    }
    //获取学期信息
    async getSemester() {
        //最终的结果
        const last_result = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.SEMESTER}`, ERROR_TARGET.LESSON_CLASS)
        if (last_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "学期信息获取失败!(数据错误)" })
        }
        return last_result
    }

    //更新课程名称信息(获取数据之后的批量更新操作) semester:当前的学期tag
    async updateLessonName(data: ILessonNameItem[], semester: string, company_id: string, getUpdate: boolean = true): Promise<ILessonNameItem[]> {
        //如果不是数组，则返回
        if (!(data instanceof Array)) return []
        //先查询已有的课程
        const res = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.NAME}`, ERROR_TARGET.LESSON_CLASS)
        //学期数据
        let lesson_name_data: ILessonNameItem[] = []
        if (res && res?.code === SQLITE_STATUS_CODE.SUCCESS) {
            lesson_name_data = Filter_ILessonName(res.data) as ILessonNameItem[]
        }
        //比对，并生成sql
        const sqls: string[] = data.map((item: ILessonNameItem) => {
            //如果已经存在，则进行更新
            const disUnique: ILessonNameItem | undefined = lesson_name_data.find((s_item: ILessonNameItem) => s_item.name === item.name && s_item.semester === semester && s_item.company_id === company_id)
            if (disUnique) {
                const filter_item: ILessonNameItem = Filter_ILessonName(mergeItem(disUnique, item)) as ILessonNameItem
                return `
                update  ${LESSON_TABLES_NAME.NAME} set name='${filter_item.name}',company_id='${company_id}',color='${filter_item.color}',ext = '${encodeURIComponent(JSON.stringify(filter_item.ext))}' where id='${filter_item.id}'
                `
            } else {
                const filter_item: ILessonNameItem = Filter_ILessonName(item) as ILessonNameItem
                return `
                insert into ${LESSON_TABLES_NAME.NAME} (name,color,semester,ext,company_id) values ('${filter_item.name}','${filter_item.color}','${semester}','${encodeURIComponent(JSON.stringify(filter_item.ext))}','${company_id}')
                `
            }
        })
        //执行sql语句
        const res_update = await this.sql?.executeSql(sqls, ERROR_TARGET.LESSON_CLASS)
        if (res_update?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "课程名称信息更新失败!(数据错误)" })
        }
        if (!getUpdate) return []
        //最终信息
        const last_result = await this.getLessonName()
        return Filter_ILessonName(last_result?.data || []) as ILessonNameItem[]
    }

    //更新课程颜色
    async updateLessonNameColor(name: string, color: string, semester: string, company_id: string): Promise<boolean> {
        const sqlStr = `update  ${LESSON_TABLES_NAME.NAME} set color='${color}' where name='${name}' and semester='${semester}' and company_id='${company_id}'`
        const res_update = await this.sql?.executeSql([sqlStr], ERROR_TARGET.LESSON_CLASS)
        if (res_update?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "课程名称颜色更新失败!(数据错误)" })
            return false
        }
        return true
    }


    //获取课程名称信息
    async getLessonName() {
        //最终的结果
        const last_result = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.NAME}`, ERROR_TARGET.LESSON_CLASS)
        if (last_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "课程名称信息更新失败!(数据错误)" })
        }
        return last_result
    }

    //获取课程数据
    async getLessonList(semesterTag?: string, cid?: string): Promise<ILessonTempItemResult[]> {
        return await this.getLessonTempStorage()
    }

    //更新记录
    async updateRecord(cid: string, semester: string, rawData: any) {
        const create_time = new Date().getTime()
        return await this.sql?.executeSql([
            `
            insert into ${LESSON_TABLES_NAME.RECORDS} (company_id,create_time,result,semester) values ('${cid}','${create_time}','${encodeURIComponent(JSON.stringify(rawData))}','${semester}')
            `
        ], ERROR_TARGET.LESSON_CLASS)
    }

    //获取最新的记录
    async getLatestRecord(cid: string, semester?: string) {
        if (!semester) return await this.sql?.selectSql(
            `
            select * from ${LESSON_TABLES_NAME.RECORDS} where company_id='${cid}' order by create_time desc limit 0,1
            `
            , ERROR_TARGET.LESSON_CLASS)
        else return await this.sql?.selectSql(
            `
            select * from ${LESSON_TABLES_NAME.RECORDS} where company_id='${cid}' and semester='${semester}' order by create_time desc limit 0,1
            `
            , ERROR_TARGET.LESSON_CLASS)
    }


    //更新temp rawData原始数据
    async updateLessonTempStorage(rawData: ILessonItemsResult[], lessonNames: ILessonNameItem[], semester: string, cid: string) {
        const reset_result = await this.resetLessonTempStorage()
        if (reset_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "课程数据缓存清除失败" })
            return
        }
        //首先解析数据 ，递归为一维数组
        const sqls: string[] = flatten(rawData.map((item: ILessonItemsResult) => {
            //先找出在lesson_name中对应的课程
            const lesson: ILessonNameItem = (lessonNames.find((l_item) => l_item.name === item.name && l_item.semester === semester) || {}) as ILessonNameItem
            const classnums: number[][] = classnumsToArray(item.classnums)
            const weeks: number[] = weeksToArray(item.weeks)
            const weekday: number[] = rangeToSequence(item.weekday)
            //插入数据了
            return classnums.map((classnum) => {
                return `
                insert into ${LESSON_TABLES_NAME.TEMP} (lesson_id,semester,weekday,weeks,teacher,position,time,ext,company_id) values('${lesson.id || 0}','${semester}','${JSON.stringify(weekday)}','${JSON.stringify(weeks)}','${item.teacher || ''}','${item.room || ''}','${JSON.stringify(classnum)}','${encodeURIComponent(JSON.stringify(item.ext || { name: lesson.name }))}','${cid}')
                `
            })
        }))
        const res = await this.sql?.executeSql(sqls, ERROR_TARGET.LESSON_CLASS)
        return res
    }
    //获取temp数据
    async getLessonTempStorage(): Promise<ILessonTempItemResult[]> {
        const result = await this.sql?.selectSql(
            `select a.id temp_id,a.semester smester,b.id lesson_id,b.color color,b.name name,b.ext b_ext,a.weekday weekday,a.weeks weeks,a.teacher teacher,a.position position,a.time time,a.ext a_ext,a.company_id company_id from ${LESSON_TABLES_NAME.TEMP} as a left join ${LESSON_TABLES_NAME.NAME} as b on a.lesson_id=b.id`
            , ERROR_TARGET.LESSON_CLASS
        )
        if (result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "课程数据信息获取失败!" })
        } else {
            result.data = Filter_ILessonTempResult(result.data)
        }
        return result?.data || []
    }

    //重置temp表
    async resetLessonTempStorage() {
        return await this.sql?.executeSql([
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.TEMP].drop || '',
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.TEMP].init
        ], ERROR_TARGET.LESSON_CLASS)
    }

    //获取更新教务信息
    async freshTimeTable(term: string): Promise<boolean> {
        try {
            const store = useJiaowuStore()
            const username = store.jiaowuAccount.username
            const password = store.jiaowuAccount.password

            if (!store.jiaowuConfig.cid) return false
            const encrypt = new Encrypt()

            //教务配置重新配置
            const jw_config_data = await jwConfig({
                cid: store.jiaowuConfig.cid
            })
            //未成功，终止流程
            if (jw_config_data.code !== CODE.SUCCESS) return false
            encrypt.setPublicKey(jw_config_data.data.public_key)
            const password_encrypt = encrypt.encrypt(password)
            const data = await jwTimetable({
                username,
                password: password_encrypt,
                cid: store.jiaowuConfig.cid,
                term
            })
            //获取信息
            if (data.code === CODE.SUCCESS) {
                //#region 学期信息
                const semester_origin = data.data.semester
                const semester = (Object.keys(semester_origin) || []).map((item: any) => {
                    return {
                        name: semester_origin[item],
                        tag: item,
                        company_id: store.jiaowuConfig.cid
                    }
                })
                //更新到数据库
                await this.updateSemester(semester as ISemesterItem[], store.jiaowuConfig.cid, false)
                //#endregion
                //#region 当前学期
                const semester_current_origin = data.data.semesterNow

                let semester_current = term
                if (term === "") {
                    semester_current = (semester_current_origin || {}).value || ""
                }

                //#region 先更新record
                await this.updateRecord(store.jiaowuConfig.cid, semester_current, data.data || {})

                //#endregion
                // //更新课程名称信息
                // //#region 课程名称
                // const lesson_name_origin = data.data.datalist
                // const lesson_name: ILessonNameItem[] = Array.from(new Set((lesson_name_origin || []).map((item: any) => item.name))).map((item) => ({
                //     name: item,
                //     semester: semester_current
                // })) as ILessonNameItem[]
                // const lesson_name_result: ILessonNameItem[] = await this.updateLessonName(lesson_name, semester_current, store.jiaowuConfig.cid)
                // //更新课程名称信息
                // //#endregion
                // //#region 更新temp信息
                // await this.updateLessonTempStorage(data.data.datalist || [], lesson_name_result, semester_current, store.jiaowuConfig.cid)
                // //#endregion
                await this.doUpdateLesson(semester_current, data.data.datalist)

                //当前学期
                const lessonStore = useLessonStore()
                lessonStore.semester = semester_current

                //#endregion
                return true
            } else {
                ToastModule.show({ text: '（教务课程）数据更新失败' + data.msg })
                return false
            }
        } catch (e: any) {
            ToastModule.show({ text: '（教务课程）数据更新失败' + e })
        }
        return false
    }

    //更新课程信息(不请求接口)
    async doUpdateLesson(semester: string, rawData?: any) {
        const jiaowuStore = useJiaowuStore()
        let data = []
        if (!rawData) {
            //从数据库查找最新的
            const record = await this.getLatestRecord(jiaowuStore.jiaowuConfig.cid, semester)
            data = JSON.parse(decodeURIComponent(record!.data[0].result))
        }
        //查询编辑的
        const list: any = await this.getEditList(rawData || data.datalist, semester)

        //更新课程名称信息
        //#region 课程名称
        const lesson_name_origin = list
        const lesson_name: ILessonNameItem[] = Array.from(new Set((lesson_name_origin || []).map((item: any) => item.name))).map((item) => ({
            name: item,
            semester: semester
        })) as ILessonNameItem[]
        const lesson_name_result: ILessonNameItem[] = await this.updateLessonName(lesson_name, semester, jiaowuStore.jiaowuConfig.cid)
        //更新课程名称信息
        //#endregion
        //#region 更新temp信息
        await this.updateLessonTempStorage(list || [], lesson_name_result, semester, jiaowuStore.jiaowuConfig.cid)
        //#endregion
    }
    //获取编辑的数据 rawData(原始数据) 
    async getEditList(rawData: any, semester: string) {
        const jiaowuStore = useJiaowuStore()
        // 查询数据库
        const data = await this.sql?.selectSql(
            `
            select * from ${LESSON_TABLES_NAME.EDIT} where company_id='${jiaowuStore.jiaowuConfig.cid}' and semester='${semester}'
            `
            , ERROR_TARGET.LESSON_CLASS)
        const list = rawData
        //遍历数据
        data?.data.forEach((item: any) => {
            const ext: any = JSON.parse(decodeURIComponent(item.ext))

            console.log(ext.add)
            //添加,则直接添加
            if (item.action === LESSON_EDIT_TYPE.ADD) {
                list.push(ext.add)
            }
            //编辑

            //删除


        })
        return list
    }

    //计算并设置当前的周次
    async setCurrentWeek() {
        dayjs.extend(weekday)
        //从教务store获取数据
        const store = useJiaowuStore()
        const lessonStore = useLessonStore()
        const week = store.week.nowWeek
        //每周的第一天
        const weekFirstDay = lessonStore.weekFirstDay
        //更新时间
        const updateTime = dayjs(store.updateTime).isValid() ? dayjs(store.updateTime).weekday(weekFirstDay).startOf('D') : dayjs().weekday(weekFirstDay).startOf('D')
        if (week !== 0) {
            //计算相差了多少天
            const currentTime = dayjs().weekday(weekFirstDay).startOf('D')
            //相差了多少周
            const diff = currentTime.diff(updateTime, "week")
            //计算出了周次
            lessonStore.currentWeek = week + diff
        }
    }

    //获取当前周次的课程，必须等待加载完毕(initing=false)
    getCurrentWeekLesson() {
        const lessonStore = useLessonStore()
        // const filter = 
        return lessonStore.lessonList.filter(item => {
            return item.weeks instanceof Array && item.weeks.indexOf(lessonStore.currentWeek) > 0
        })
    }

    //获取今天的课程
    getCurrentDayLesson(sort: boolean = true): ILessonTempItemResult[] {
        const data: ILessonTempItemResult[] = this.getCurrentWeekLesson().filter(item => {
            if (item.week.includes(0) || item.week.includes(7)) {
                return dayjs().day() == 0 ? true : false
            }
            return item.week && item.week.length && (item.week.includes(dayjs().day()))
        })
        //是否排序
        if (sort) data.sort((a: ILessonTempItemResult, b: ILessonTempItemResult) => {
            return a.time[0] - b.time[0]
        })
        return data
    }

    //添加课程
    async addLesson(formData: any): Promise<boolean> {
        try {
            const jiaowuStore = useJiaowuStore()
            const record = await this.getLatestRecord(jiaowuStore.jiaowuConfig.cid)
            const semester = record!.data[0].semester
            //参数优化
            const item: ILessonItemsResult = {
                //课程名称
                name: formData.name.trim(),
                //上课节次
                classnums: sequenceToRange(formData.classnums),
                //上课星期
                weekday: sequenceToRange(formData.weekday),
                //上课教师
                teacher: formData.teacher.trim(),
                //周次
                weeks: sequenceToRange(formData.weeks),
                //上课地点
                room: formData.room.trim()
            }
            console.log(item)
            // 获取课程id
            const lessonsName = await this.updateLessonName([{
                name: formData.name,
                semester
            }] as ILessonNameItem[], semester, jiaowuStore.jiaowuConfig.cid)
            const lessonId = lessonsName.find(item => item.semester === semester && item.name === formData.name)?.id
            if (!lessonId) throw new Error("课程新增失败了!")

            const ext = {
                add: item
            }
            //插入表
            const sql = `
            insert into ${LESSON_TABLES_NAME.EDIT} (lesson_id,action,semester,ext,company_id) values ('${lessonId}','${LESSON_EDIT_TYPE.ADD}','${semester}','${encodeURIComponent(JSON.stringify(ext))}','${jiaowuStore.jiaowuConfig.cid}')
            `
            const res = await this.sql?.executeSql([sql], ERROR_TARGET.LESSON_CLASS)
            if (res?.code === SQLITE_STATUS_CODE.FAIL) throw new Error("失败!" + res.msg)
            //更新缓存表
            await this.doUpdateLesson(semester, JSON.parse(decodeURIComponent(record!.data[0].result)).datalist)
            return true
        } catch (e) {
            ToastModule.show({
                text: '保存失败' + e
            })
        }
        return false
    }

    //学期，不传学期，则设置为当前学期
    async getEdit(semester?: string) {
        const jiaowuStore = useJiaowuStore()
        if (!semester) {
            const record = await this.getLatestRecord(jiaowuStore.jiaowuConfig.cid)
            semester = record!.data[0].semester
        }
        //查询
        const data = await this.sql?.selectSql(
            `select * from ${LESSON_TABLES_NAME.EDIT} where company_id='${jiaowuStore.jiaowuConfig.cid}' and semester='${semester}'`
            , ERROR_TARGET.LESSON_CLASS)
        return data?.data || []
    }

    //删除记录
    async removeEdit(semester: string, id?: string) {
        uni.$anydoor_native.Dialog_Module.showWaitingDialogSync({ title: '删除中,请稍等...' })
        try {
            const sql = `
            delete from ${LESSON_TABLES_NAME.EDIT} where id ='${id}'
            `
            const result = await this.sql?.executeSql([sql], ERROR_TARGET.LESSON_CLASS)

            const currentSemester = useLessonStore().semester
            //如果是同一个学期就需要刷新
            if (currentSemester === semester) {
                await this.doUpdateLesson(semester)
            }

            uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
            return result?.code === SQLITE_STATUS_CODE.SUCCESS
        } catch { }
        uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
        return false
    }


    //新增背景(sql)
    async addBackground(id: number, path: string, filename: string, thumb: string, url: string): Promise<boolean> {
        //先删除
        const removeSql = `
        delete from ${LESSON_TABLES_NAME.BACKGROUND} where id='${id}'
        `
        await this.sql?.executeSql([removeSql], ERROR_TARGET.LESSON_CLASS)
        //插入表
        const sql = `
            insert into ${LESSON_TABLES_NAME.BACKGROUND} (id,path,filename,thumb,url) values ('${id}','${path}','${filename}','${thumb}','${url}')
            `
        const res = await this.sql?.executeSql([sql], ERROR_TARGET.LESSON_CLASS)
        return res?.code === SQLITE_STATUS_CODE.SUCCESS || false
    }
    //下载背景
    async downloadBackground(id: number, thumb: string, url: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            uni.downloadFile({
                url: url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveFile({
                            tempFilePath: res.tempFilePath,
                            success: (res) => {
                                this.addBackground(id, plus.io.convertLocalFileSystemURL(res.savedFilePath), res.savedFilePath, thumb, url).then(res => {
                                    resolve(true)
                                }).catch(e => {
                                    ToastModule.show({ text: '保存失败!' + e })
                                    reject()
                                })
                            },
                            fail: () => {
                                ToastModule.show({ text: '保存失败!' })
                            }
                        })
                    } else {
                        ToastModule.show({ text: '下载失败!' })
                        reject()
                    }
                },
                fail: () => {
                    ToastModule.show({ text: '下载失败!' })
                    reject()
                }
            })
        })
    }

    //获取已下载的列表
    async getBackgroundList(): Promise<any> {
        const data = (await this.sql?.selectSql(
            `select * from ${LESSON_TABLES_NAME.BACKGROUND}`
            , ERROR_TARGET.LESSON_CLASS))?.data || []
        const list: any = [];

        for (let i = 0; i < data.length; i++) {
            try {
                await getFileInfo(data[i].path)
                list.push(data[i])
            } catch { }
        }

        return list
    }
    //设置背景颜色
    async setBackground(background: string, type: LESSON_BACKGROUND_TYPE, fullPath?: string): Promise<any> {
        const config = { background, type, fullPath }
        //从unistorge里面获取
        uni.setStorageSync(UNI_STORAGE.LESSON_BACKGROUNF_CONFIG, config)
        //加入store
        const lessonStore = useLessonStore()
        lessonStore.lessonBackground.background = background
        lessonStore.lessonBackground.type = type
        lessonStore.lessonBackground.fullPath = fullPath

        //数据库操作
        const removeSql = `
        delete from ${LESSON_TABLES_NAME.THEME} where key='${UNI_STORAGE.LESSON_BACKGROUNF_CONFIG}'
        `
        await this.sql?.executeSql([removeSql], ERROR_TARGET.LESSON_CLASS)
        //插入表
        const sql = `
            insert into ${LESSON_TABLES_NAME.THEME} (key,value) values ('${UNI_STORAGE.LESSON_BACKGROUNF_CONFIG}','${encodeURIComponent(JSON.stringify(config))}')
            `
        return await this.sql?.executeSql([sql], ERROR_TARGET.LESSON_CLASS)
    }


    //获取背景颜色
    async getBackground(): Promise<{
        background: string,
        type: LESSON_BACKGROUND_TYPE,
        fullPath?: string
    }> {
        return await uni.getStorageSync(UNI_STORAGE.LESSON_BACKGROUNF_CONFIG)
    }

}