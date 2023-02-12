import SQLite from "../../sql/SQLite"
import databases, { DATA } from "../database"
import { LESSON_TABLES_NAME } from "../tables/lesson"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:14:20
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-12 21:41:25
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
        console.log(1)
        this.initDataTable().then((res) => {
            console.log(res)
        })
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
        ])
    }


}