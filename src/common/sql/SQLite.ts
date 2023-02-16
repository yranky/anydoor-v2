/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 17:27:47
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-15 18:20:33
 * @FilePath: \anydoor-v2\src\common\sql\SQLite.ts
 * @Description: sql
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

//TODO 进行queue队列的清理操作
import databases, { DATA } from "../database/database"
import ErrorHandler from "../errorHandler/ErrorHandler"

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
    // @ts-ignore
    private static MODULE = uni.requireNativePlugin("anydoor_sqlite")

    constructor(name: DATA, path?: string) {
        this.name = name
        this.path = path || databases[name].path
        //初始化队列
        if (!SQLite.queue[name]) SQLite.queue[name] = []
    }
    private static queue: IQueue = {}
    //执行sql语句
    executeSql(sql: string[], failTag: string = "unknown", failHandler?: Function): Promise<ISQLiteStatusResult> {
        const promise: Promise<ISQLiteStatusResult> = new Promise(async (resolve) => {
            //等待
            await (SQLite.queue[this.name]!.splice(SQLite.queue[this.name]!.length - 1, 1)[0] || Promise.resolve())
            SQLite.MODULE.executeSql({
                path: this.path,
                sql
            }, (res) => {
                // console.log(res)
                if (res.success === true) {
                    resolve({ code: SQLITE_STATUS_CODE.SUCCESS, msg: 'ok', data: {} })
                } else {
                    resolve({ code: SQLITE_STATUS_CODE.FAIL, msg: 'ok', error: res.error })
                    //上报错误,如果没有自定义错误
                    if (failHandler === undefined) {
                        //上报错误
                        ErrorHandler.push(failTag, JSON.stringify(res.error))
                    }
                    //执行自定义错误
                    typeof failHandler === "function" && failHandler(res.error)
                }
            })
        })
        SQLite.queue[this.name]!.push(promise)
        return promise
    }
    //执行查询语句
    selectSql(sql: string, failTag: string = "unknown", failHandler?: Function): Promise<ISQLiteStatusResult> {
        const promise: Promise<ISQLiteStatusResult> = new Promise(async (resolve) => {
            //等待
            await (SQLite.queue[this.name]!.splice(SQLite.queue[this.name]!.length - 1, 1)[0] || Promise.resolve())
            SQLite.MODULE.selectSql({
                path: this.path,
                sql
            }, (res) => {
                // console.log(res)
                if (res.success === true) {
                    resolve({ code: SQLITE_STATUS_CODE.SUCCESS, msg: 'ok', data: res.data })
                } else {
                    resolve({ code: SQLITE_STATUS_CODE.FAIL, msg: 'ok', error: res.error })
                    //上报错误,如果没有自定义错误
                    if (failHandler === undefined) {
                        //上报错误
                        ErrorHandler.push(failTag, JSON.stringify(res.error))
                    }
                    //执行自定义错误
                    typeof failHandler === "function" && failHandler(res.error)
                }
            })
        })
        SQLite.queue[this.name]!.push(promise)
        return promise
    }
}