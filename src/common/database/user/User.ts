/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-19 11:55:28
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-05 11:33:35
 * @FilePath: \anydoor-v2\src\common\database\user\User.ts
 * @Description: 用户
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import SQLite, { SQLITE_STATUS_CODE } from "@/common/sql/SQLite"
import databases, { DATA } from "../database"
import ERROR_TARGET from "@/common/errorHandler/ERROR_TARGET"
import { USER_TABLES_NAME } from "../tables/user"
import ToastModule from "@/common/native/toast/ToastModule"
import Encrypt from "@/common/encrypt/Encrypt"

export default class User {
    //sqlite对象
    private sql: SQLite | undefined
    //构造函数
    private constructor() { }

    //获取实例对象
    static async getInstance() {
        if (uni.$anydoor.User === undefined) {
            uni.$anydoor.User = new User()
            //初始化工作
            uni.$anydoor.User.sql = new SQLite(DATA.USER)
            //需要等待完成才能
            await uni.$anydoor.User.initDataTable()
        }
        return uni.$anydoor.User
    }

    //初始化用户表
    async initDataTable() {
        return await this.sql!.executeSql([
            databases[DATA.USER].tables[USER_TABLES_NAME.ACCOUNT].init,
            databases[DATA.USER].tables[USER_TABLES_NAME.TOKEN].init,
            databases[DATA.USER].tables[USER_TABLES_NAME.CURRENT].init,
            databases[DATA.USER].tables[USER_TABLES_NAME.JAIOWU].init,
        ], ERROR_TARGET.USER_CLASS)
    }

    async getJiaowuAccount(init: boolean = false) {
        //最终的结果(初始化则不显示提示信息)
        const last_result = await this.sql?.selectSql(`select * from ${USER_TABLES_NAME.JAIOWU}`, ERROR_TARGET.USER_CLASS)
        if (last_result?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            !init && ToastModule.show({ text: "教务账号信息获取失败，请尝试重新登录" })
            return false
        } else {
            const decryptObj = new Encrypt()
            if (last_result.data[0]) {
                const username = last_result.data[0].username
                const password = decryptObj.decrypt(last_result.data[0].password)
                let ext = {}
                try {
                    ext = JSON.parse(decodeURIComponent(last_result.data[0].ext))
                } catch { }
                if (typeof password === "boolean") {
                    !init && ToastModule.show({ text: "教务账号解密失败!" })
                    return false
                } else {
                    return {
                        username,
                        password,
                        ...ext
                    }
                }
            } else {
                !init && ToastModule.show({ text: "教务账号信息获取失败，请尝试重新登录" })
                return false
            }
        }
    }

    //插入一个教务账号
    async insertJiaowuAccount(username: string, password: string, ext: any = {}) {
        //先将密码加密
        const encryptObj = new Encrypt()
        const encryptData = encryptObj.encrypt(password)
        //加密失败
        if (typeof encryptData === "boolean") {
            ToastModule.show({ text: '加密失败!' })
            return false
        } else {
            const current = await this.sql?.executeSql([
                //清空当前的
                `
                 DELETE FROM ${USER_TABLES_NAME.JAIOWU}
                `,
                //插入一条新的
                `
                insert into  ${USER_TABLES_NAME.JAIOWU} (uid,username,password,ext) values (0,${username},'${encryptData}','${encodeURIComponent(JSON.stringify(ext))}')
             `], ERROR_TARGET.USER_CLASS)

            if (current?.code !== SQLITE_STATUS_CODE.SUCCESS) {
                ToastModule.show({ text: "教务登录出现问题!" })
                return false
            }
            return true
        }
    }

    //插入一个用户
    async insertUserAccount(token: string, refresh_token: string) {
        //初始工作
        await this.sql?.executeSql([
            //清空当前的
            `
        DELETE FROM ${USER_TABLES_NAME.CURRENT}
        `,
            //插入一条新的
            `
        insert into  ${USER_TABLES_NAME.ACCOUNT} (ext) values ('')
        `], ERROR_TARGET.USER_CLASS)
        //返回上一次插入的id
        const current = await this.sql?.selectSql(`select * from ${USER_TABLES_NAME.ACCOUNT} order by id desc limit 1`, ERROR_TARGET.USER_CLASS)
        if (current?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: "登录出现问题!" })
        }
        let id = 0
        try {
            id = current?.data[0].id
        } catch { }
        const time: number = new Date().getTime() / 1000
        //将当前行的id加入current,将token也保存
        await this.sql?.executeSql([`insert into  ${USER_TABLES_NAME.CURRENT} (uid) values (${id})`,
        //将token也保存
        `insert into  ${USER_TABLES_NAME.TOKEN} (token,refresh_token,create_time,update_time,uid) values (${token},${refresh_token},${time},${time},${id})`
        ], ERROR_TARGET.USER_CLASS)

    }

}