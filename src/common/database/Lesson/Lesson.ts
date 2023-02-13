import { flatten } from "lodash"
import ERROR_TARGET from "../../errorHandler/ERROR_TARGET"
import SQLite, { SQLITE_STATUS_CODE } from "../../sql/SQLite"
import Toast from "../../toast/toast"
import databases, { DATA } from "../database"
import { LESSON_TABLES_NAME } from "../tables/lesson"
import { ILessonItemsResult, ILessonNameItem, ISemesterItem } from "./ILesson"
import { Filter_ILessonName, Filter_ISemester, mergeItem } from "./lesson_filters"
import { classnumsToArray, weeksToArray } from "./lesson_temp_utils"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:14:20
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-13 23:40:47
 * @FilePath: \anydoor-v2\src\common\database\Lesson\Lesson.ts
 * @Description: 课程数据获取类
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default class Lesson {
    //对象
    private static instance = new Lesson()
    //sqlite对象
    private sql: SQLite | undefined

    //获取实例对象
    static getInstance() {
        return Lesson.instance
    }
    //构造函数
    private constructor() {
        //初始化sql
        this.sql = new SQLite(DATA.LESSON)
        this.initDataTable()
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
    async updateSemester(data: ISemesterItem[]): Promise<ISemesterItem[]> {
        if (!(data instanceof Array)) return []
        //先查询已有的学期
        const res = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.SEMESTER}`, ERROR_TARGET.LESSON_CLASS)
        //学期数据
        let semester_data: ISemesterItem[] = []
        if (res && res?.code === SQLITE_STATUS_CODE.SUCCESS) {
            semester_data = Filter_ISemester(res.data) as ISemesterItem[]
        }
        //比对，并生成sql
        const sqls: string[] = data.map((item: ISemesterItem) => {
            //如果已经存在，则进行更新
            const disUnique: ISemesterItem | undefined = semester_data.find((s_item: ISemesterItem) => s_item.name === item.name)
            if (disUnique) {
                const filter_item: ISemesterItem = Filter_ISemester(mergeItem(disUnique, item)) as ISemesterItem
                return `
                update  ${LESSON_TABLES_NAME.SEMESTER} set name='${filter_item.name}',ext = '${encodeURIComponent(JSON.stringify(filter_item.ext))}' where id='${filter_item.id}'
                `
            } else {
                const filter_item: ISemesterItem = Filter_ISemester(item) as ISemesterItem
                return `
                insert into ${LESSON_TABLES_NAME.SEMESTER} (name,tag,ext) values ('${filter_item.name}','${filter_item.tag}','${encodeURIComponent(JSON.stringify(filter_item.ext))}')
                `
            }
        })
        //执行sql语句
        const res_update = await this.sql?.executeSql(sqls, ERROR_TARGET.LESSON_CLASS)
        if (res_update?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            Toast.show({ text: "学期信息更新失败!(数据错误)" })
        }
        //最终信息
        const last_result = await this.getSemester()
        return Filter_ISemester(last_result?.data || []) as ISemesterItem[]
    }
    //获取学期信息
    async getSemester() {
        //最终的结果
        const last_result = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.SEMESTER}`, ERROR_TARGET.LESSON_CLASS)
        if (last_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            Toast.show({ text: "学期信息获取失败!(数据错误)" })
        }
        return last_result
    }

    //更新课程名称信息(获取数据之后的批量更新操作) semester:当前的学期tag
    async updateLessonName(data: ILessonNameItem[], semester: string): Promise<ILessonNameItem[]> {
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
            const disUnique: ILessonNameItem | undefined = lesson_name_data.find((s_item: ILessonNameItem) => s_item.name === item.name && s_item.semester === semester)
            if (disUnique) {
                const filter_item: ILessonNameItem = Filter_ILessonName(mergeItem(disUnique, item)) as ILessonNameItem
                return `
                update  ${LESSON_TABLES_NAME.NAME} set name='${filter_item.name}',color='${filter_item.color}',ext = '${encodeURIComponent(JSON.stringify(filter_item.ext))}' where id='${filter_item.id}'
                `
            } else {
                const filter_item: ILessonNameItem = Filter_ILessonName(item) as ILessonNameItem
                return `
                insert into ${LESSON_TABLES_NAME.NAME} (name,color,semester,ext) values ('${filter_item.name}','${filter_item.color}','${semester}','${encodeURIComponent(JSON.stringify(filter_item.ext))}')
                `
            }
        })
        //执行sql语句
        const res_update = await this.sql?.executeSql(sqls, ERROR_TARGET.LESSON_CLASS)
        if (res_update?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            Toast.show({ text: "课程名称信息更新失败!(数据错误)" })
        }
        //最终信息
        const last_result = await this.getLessonName()
        return Filter_ILessonName(last_result?.data || []) as ILessonNameItem[]
    }
    //获取课程名称信息
    async getLessonName() {
        //最终的结果
        const last_result = await this.sql?.selectSql(`select * from ${LESSON_TABLES_NAME.NAME}`, ERROR_TARGET.LESSON_CLASS)
        if (last_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            Toast.show({ text: "课程名称信息更新失败!(数据错误)" })
        }
        return last_result
    }

    //刷新课程数据
    async updateLessonList(data: ILessonItemsResult[], semesterTag: string) {
        //首先解析课程数据

        /**
         * 课程名称更新开始
         */
        //解析课程名称数据
        const lesson_name_arr: ILessonNameItem[] = data.map((item: ILessonItemsResult) => Filter_ILessonName({
            name: item.name,
            semester: semesterTag
        })) as ILessonNameItem[]
        // console.log(lesson_name_arr)
        //更新
        const lesson_name_result: ILessonNameItem[] = await this.updateLessonName(lesson_name_arr, semesterTag)
        console.log(lesson_name_result)
        //更新temp
        await this.updateLessonTempStorage(data, lesson_name_result, semesterTag)

        //刷新temp
        const temp_sqls: String[] = data.map((item) => {
            return `
            insert into ${LESSON_TABLES_NAME.TEMP} ()
            `
        })

        //解析学期

        //刷新RECORD,新增一条
        const company_id: String = "123456"
        const create_time = new Date().getTime()
        const result = JSON.stringify(data)
        this.sql?.executeSql([
            `
            insert into ${LESSON_TABLES_NAME.RECORDS} (company_id,create_time,result) values ('${company_id}','${create_time}','${encodeURIComponent(result)}')
            `
        ], ERROR_TARGET.LESSON_CLASS)
    }
    //更新temp rawData原始数据
    async updateLessonTempStorage(rawData: ILessonItemsResult[], lessonNames: ILessonNameItem[], semester: string) {
        const reset_result = await this.resetLessonTempStorage()
        if (reset_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            Toast.show({ text: "课程数据缓存清除失败" })
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
                insert into ${LESSON_TABLES_NAME.TEMP} (lesson_id,semester,weekday,weeks,teacher,position,time,ext) values('${lesson.id || 0}','${semester}','${item.weekday}','${JSON.stringify(weeks)}','${item.teacher || ''}','${item.room || ''}','${JSON.stringify(classnum)}','${encodeURIComponent(JSON.stringify(item.ext || { name: lesson.name }))}')
                `
            })
        }))
        const res = await this.sql?.executeSql(sqls, ERROR_TARGET.LESSON_CLASS)
        return res
    }
    //获取temp数据
    async getLessonTempStorage() {
        return await this.sql?.selectSql(
            `select a.id temp_id,a.semester smester,b.id lesson_id,b.color color,b.name name,b.ext b_ext,a.weekday weekday,a.weeks weeks,a.teacher teacher,a.position position,a.time time,a.ext a_ext from ${LESSON_TABLES_NAME.TEMP} as a left join ${LESSON_TABLES_NAME.NAME} as b on a.lesson_id=b.id`
            , ERROR_TARGET.LESSON_CLASS
        )
    }

    //重置temp表
    async resetLessonTempStorage() {
        return await this.sql?.executeSql([
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.TEMP].drop || '',
            databases[DATA.LESSON].tables[LESSON_TABLES_NAME.TEMP].init
        ], ERROR_TARGET.LESSON_CLASS)
    }


}