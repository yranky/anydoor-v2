/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 17:27:47
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-01-20 23:32:26
 * @FilePath: \anydoor-v2\src\common\sql\sqlite\SQLite.ts
 * @Description: sql
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

//TODO 进行queue队列的清理操作
import databases, { DATA } from "./database"

export enum SQLITE_STATUS_CODE {
    SUCCESS = 200,
    FAIL = 1
}

export interface ISQLiteStatusResult {
    code: SQLITE_STATUS_CODE,
    msg?: any,
    error?: any
    data?: any
}

type IQueue = {
    [key in DATA]?: Promise<ISQLiteStatusResult>[]
}

export default class SQLite {
    //数据库名称
    private name: DATA
    //数据库路径
    private path: string
    constructor(name: DATA, path?: string) {
        this.name = name
        this.path = path || databases[DATA.MPROGRAM].path
        //初始化队列
        if (!SQLite.queue[name]) SQLite.queue[name] = []
    }
    private static queue: IQueue = {}
    //打开数据库
    open(): Promise<ISQLiteStatusResult> {
        return new Promise((resolve) => {
            //先判断有没有打开
            const isOpen: boolean = plus.sqlite.isOpenDatabase({ name: this.name, path: this.path })
            if (isOpen) resolve({ code: SQLITE_STATUS_CODE.SUCCESS })
            plus.sqlite.openDatabase({
                name: this.name,
                path: this.path,
                success: function () {
                    resolve({ code: SQLITE_STATUS_CODE.SUCCESS })
                },
                fail: function (e) {
                    resolve({ code: SQLITE_STATUS_CODE.FAIL, msg: JSON.stringify(e), error: JSON.stringify(e) })
                }
            })
        })
    }
    //关闭数据库
    close(): Promise<ISQLiteStatusResult> {
        return new Promise((resolve) => {
            //先判断有没有打开
            const isOpen: boolean = plus.sqlite.isOpenDatabase({ name: this.name, path: this.path })
            if (!isOpen) resolve({ code: SQLITE_STATUS_CODE.SUCCESS })
            plus.sqlite.closeDatabase({
                name: this.name,
                success: function () {
                    resolve({ code: SQLITE_STATUS_CODE.SUCCESS })
                },
                fail: function (e) {
                    resolve({ code: SQLITE_STATUS_CODE.FAIL, msg: JSON.stringify(e), error: JSON.stringify(e) })
                }
            })
        })
    }
    //执行sql语句
    executeSql(sql: string[]): Promise<ISQLiteStatusResult> {
        const promise: Promise<ISQLiteStatusResult> = new Promise(async (resolve) => {
            //等待
            if (SQLite.queue[this.name]!.length > 0) await SQLite.queue[this.name]![SQLite.queue[this.name]!.length - 1]
            //先打开数据库
            const openRes: ISQLiteStatusResult = await this.open()
            if (openRes.code !== SQLITE_STATUS_CODE.SUCCESS) resolve(openRes)
            plus.sqlite.executeSql({
                name: this.name,
                sql,
                success: (e: any) => {
                    resolve({ code: SQLITE_STATUS_CODE.SUCCESS, msg: 'ok', data: e })
                },
                fail: (e: any) => {
                    resolve({ code: SQLITE_STATUS_CODE.FAIL, msg: 'ok', error: e })
                }
            })
            this.close()
        })
        SQLite.queue[this.name]!.push(promise)
        return promise
    }
    //执行查询语句
    selectSql(sql: string): Promise<ISQLiteStatusResult> {
        const promise: Promise<ISQLiteStatusResult> = new Promise(async (resolve) => {
            //等待
            if (SQLite.queue[this.name]!.length > 0) await SQLite.queue[this.name]![SQLite.queue[this.name]!.length - 1]
            //先打开数据库
            const openRes: ISQLiteStatusResult = await this.open()
            if (openRes.code !== SQLITE_STATUS_CODE.SUCCESS) resolve(openRes)
            plus.sqlite.selectSql({
                name: this.name,
                sql,
                success: (e: any) => {
                    resolve({ code: SQLITE_STATUS_CODE.SUCCESS, msg: 'ok', data: e })
                },
                fail: (e: any) => {
                    resolve({ code: SQLITE_STATUS_CODE.FAIL, msg: 'ok', error: e })
                }
            })
            this.close()
        })
        SQLite.queue[this.name]!.push(promise)
        return promise
    }
}