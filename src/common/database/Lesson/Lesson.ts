/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:14:20
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-06-14 15:37:55
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
import { ILessonItemsResult, ILessonNameItem, ILessonTempItemResult, ISemesterItem } from "./ILesson"
import { Filter_ILessonName, Filter_ILessonTempResult, Filter_ISemester, mergeItem } from "./lesson_filters"
import { classnumsToArray, weeksToArray } from "./lesson_temp_utils"
import ToastModule from "@/common/native/toast/ToastModule"
import Encrypt from "@/common/encrypt/Encrypt"
import useJiaowuStore from "@/store/jiaowu"
import { jwConfig, jwTimetable } from "@/common/service/jw"
import CODE from "@/common/define/code"
import { useLessonStore } from "@/store/lesson"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"

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
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.EDIT].init
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
    async updateLessonNameColor(name:string, color:string, semester: string, company_id: string):Promise<boolean> {
        const sqlStr=`update  ${LESSON_TABLES_NAME.NAME} set color='${color}' where name='${name}' and semester='${semester}' and company_id='${company_id}'`
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
    async getLessonList(semesterTag?: string, cid?: string) {
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
    async getLatestRecord(cid: string) {
        return await this.sql?.selectSql(
            `
            select * from ${LESSON_TABLES_NAME.RECORDS} where company_id='${cid}' order by create_time desc limit 0,1
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
            //插入数据了
            return classnums.map((classnum) => {
                return `
                insert into ${LESSON_TABLES_NAME.TEMP} (lesson_id,semester,weekday,weeks,teacher,position,time,ext,company_id) values('${lesson.id || 0}','${semester}','${item.weekday}','${JSON.stringify(weeks)}','${item.teacher || ''}','${item.room || ''}','${JSON.stringify(classnum)}','${encodeURIComponent(JSON.stringify(item.ext || { name: lesson.name }))}','${cid}')
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

                //#endregion
                //更新课程名称信息
                //#region 课程名称
                const lesson_name_origin = data.data.datalist
                const lesson_name: ILessonNameItem[] = Array.from(new Set((lesson_name_origin || []).map((item: any) => item.name))).map((item) => ({
                    name: item,
                    semester: semester_current
                })) as ILessonNameItem[]
                const lesson_name_result: ILessonNameItem[] = await this.updateLessonName(lesson_name, semester_current, store.jiaowuConfig.cid)
                //更新课程名称信息
                //#endregion
                //#region 更新temp信息
                await this.updateLessonTempStorage(data.data.datalist || [], lesson_name_result, semester_current, store.jiaowuConfig.cid)
                //#endregion

                //#region 更新record
                await this.updateRecord(store.jiaowuConfig.cid, semester_current, data.data || {})
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
        const updateTime = dayjs(store.updateTime).isValid() ? dayjs(store.updateTime).weekday(weekFirstDay) : dayjs().weekday(weekFirstDay)
        if (week !== 0) {
            //计算相差了多少天
            const currentTime = dayjs().weekday(weekFirstDay)
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
    getCurrentDayLesson() {
        return this.getCurrentWeekLesson().filter(item => {
            if (item.week == 0 || item.week == 7) {
                return dayjs().day() == 0 ? true : false
            }
            return item.week && (item.week == dayjs().day())
        })
    }


}