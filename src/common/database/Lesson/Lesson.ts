import SQLite from "../../sql/SQLite"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:14:20
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-07 13:41:01
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
        //如果没有就重新加载
        if (!Lesson.MP) this.reloadMP()
        //初始化sql
        this.sql = new SQLite(DATA.LESSON)
        this.initDataTable()
    }

    //初始化课程数据
    async initDataTable() {
        return await this.sql!.executeSql([databases[DATA.MPROGRAM].tables[MPROGRAM_TABLES_NAME.PROGRAM].init])
    }


}