/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-19 11:55:28
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-08-25 21:50:20
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
import dayjs from "dayjs"
import { UNI_STORAGE } from "../UNI_STORAGE"
import { isEmpty } from "lodash"
import { useUserStore } from "@/store/user"
import { getUserInfoService } from "@/common/service/user"
import CODE from "@/common/define/code"
import useJiaowuStore from "@/store/jiaowu"
import { jwConfig, jwLogin } from "@/common/service/jw"
import { initUser } from "@/init"
import useConfigStore from "@/store/config"

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

    //获取教务登录
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
                //教务的缓存数据
                let jw_data = {}
                let ext = {}
                try {
                    ext = JSON.parse(decodeURIComponent(last_result.data[0].ext))
                    jw_data = JSON.parse(decodeURIComponent(last_result.data[0].data))
                } catch { }
                if (typeof password === "boolean") {
                    !init && ToastModule.show({ text: "教务账号解密失败!" })
                    return false
                } else {
                    return {
                        username,
                        password,
                        ...ext,
                        jw_data
                    }
                }
            } else {
                !init && ToastModule.show({ text: "教务账号信息获取失败，请尝试重新登录" })
                return false
            }
        }
    }

    //插入一个教务账号
    async insertJiaowuAccount(username: string, password: string, ext: any = {}, jw_data: any = {}) {
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
                insert into  ${USER_TABLES_NAME.JAIOWU} (uid,username,password,ext,data) values (0,'${username}','${encryptData}','${encodeURIComponent(JSON.stringify({
                    ...ext,
                    update_time: dayjs().format("YYYY/MM/DD HH:mm:ss")
                }))}','${encodeURIComponent(JSON.stringify(jw_data))}')
             `], ERROR_TARGET.USER_CLASS)
            if (current?.code !== SQLITE_STATUS_CODE.SUCCESS) {
                ToastModule.show({ text: "教务登录出现问题!" })
                return false
            }
            return true
        }
    }

    //刷新教务信息
    async freshJiaowuAccount() {
        const configStore = useConfigStore()
        if (configStore.debug) ToastModule.show({ text: '更新信息' })
        console.log('更新信息....')
        
        const store = useJiaowuStore()
        const username = store.jiaowuAccount.username
        const password = store.jiaowuAccount.password
        const encrypt = new Encrypt()

        //教务配置重新
        const jw_config_data = await jwConfig({
            cid: store.jiaowuConfig.cid
        })
        //未成功，终止流程
        if (jw_config_data.code !== CODE.SUCCESS) {
            return
        }
        encrypt.setPublicKey(jw_config_data.data.public_key)
        const password_encrypt = encrypt.encrypt(password)
        //刷新信息
        const data = await jwLogin({
            username,
            password: password_encrypt,
            cid: store.jiaowuConfig.cid
        })
        if (data.stuInfo) {
            const isSuccess: boolean = await (await User.getInstance()).insertJiaowuAccount(username, password, {
                ...jw_config_data.data,
                cid: store.jiaowuConfig.cid,
                school_name: store.jiaowuConfig.school_name
            }, data)
            if (isSuccess === false) {
                ToastModule.show({ text: "刷新教务信息失败!" })
            } else {
                //刷新user
                initUser(true)
            }
        } else {
            ToastModule.show({ text: "刷新教务信息失败!" })
        }
    }


    //退出登录
    async logoutJiaowuAccount() {
        const current = await this.sql?.executeSql([
            //清空当前的
            `
             DELETE FROM ${USER_TABLES_NAME.JAIOWU}
            `]
            , ERROR_TARGET.USER_CLASS)
        //清除storage的学校信息
        uni.removeStorageSync(UNI_STORAGE.JW_SCHOOL_INFO)
        //不成功
        if (current?.code === SQLITE_STATUS_CODE.SUCCESS) {
            return true
        } else {
            return false
        }
    }

    //插入一个用户
    async insertUserAccount(token: string, refresh_token: string) {
        //先保存在uni_torage
        uni.setStorageSync(UNI_STORAGE.USER_ANYDOOR_TOKEN, {
            token,
            refresh_token
        })

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
        const res = await this.sql?.executeSql([`insert into  ${USER_TABLES_NAME.CURRENT} (uid) values ('${id}')`,
        //将token也保存
        `insert into  ${USER_TABLES_NAME.TOKEN} (token,refresh_token,create_time,update_time,uid) values ('${token}','${refresh_token}','${time}','${time}','${id}')`
        ], ERROR_TARGET.USER_CLASS)
        if (res?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: res?.error || '未知错误!' })
        }
    }

    //更新account
    async updateUserAccount(token: string, refresh_token: string) {
        //先保存在uni_torage
        uni.setStorageSync(UNI_STORAGE.USER_ANYDOOR_TOKEN, {
            token,
            refresh_token
        })
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
        const res = await this.sql?.executeSql([
            `update ${USER_TABLES_NAME.TOKEN} set token = '${token}',refresh_token = '${refresh_token}',update_time='${time}' where uid='${id}'`
        ], ERROR_TARGET.USER_CLASS)
        if (res?.code !== SQLITE_STATUS_CODE.SUCCESS) {
            ToastModule.show({ text: res?.error || '更新用户信息时发生未知错误!' })
        }
    }

    //退出登录
    async logoutUserAccount() {
        //清除unistorage用户相关内容
        uni.removeStorageSync(UNI_STORAGE.USER_ANYDOOR_TOKEN)
        uni.removeStorageSync(UNI_STORAGE.USER_ANYDOOR_INFO)
        //清除webview缓存
        try {
            uni.$anydoor_native.Tool_Module && uni.$anydoor_native.Tool_Module.clearWebviewCache({}, () => { })
        } catch { }

        try {
            //清除数据库中的相关内容
            const res = await this.sql?.executeSql([`DELETE FROM ${USER_TABLES_NAME.CURRENT}`], ERROR_TARGET.USER_CLASS)
            if (res?.code !== SQLITE_STATUS_CODE.SUCCESS) {
                ToastModule.show({ text: res?.error || '退出登录时发生未知错误!' })
            }
        } catch { }
        //重置pinia
        const userStore = useUserStore()
        userStore.$reset()
    }

    /**
     * 获取用户token 
     */
    async freshStoreUser() {
        const token = uni.getStorageSync(UNI_STORAGE.USER_ANYDOOR_TOKEN)
        const userStore = useUserStore()
        if (!isEmpty(token)) {
            userStore.token = token.token
            userStore.refreshToken = token.refresh_token
        } else {
            //否则就查询数据库
            const current = await this.sql?.selectSql(`select * from ${USER_TABLES_NAME.CURRENT}`, ERROR_TARGET.USER_CLASS)
            if (current?.code !== SQLITE_STATUS_CODE.SUCCESS) {
                ToastModule.show({ text: "获取用户出现问题!" })
            }
            if (current?.data[0]) {
                const user = await this.sql?.selectSql(`select * from ${USER_TABLES_NAME.TOKEN} where uid=` + current.data[0].id, ERROR_TARGET.USER_CLASS)
                if (user?.data && user.data[0]) {
                    userStore.token = user.data[0].token || ''
                    userStore.refreshToken = user.data[0].refresh_token || ''
                } else {
                    ToastModule.show({ text: "获取用户出现问题!" + current.error })
                }
            }
        }
    }

    //刷新用户信息(调用接口)
    async refreshUserInfo() {
        getUserInfoService({}).then(res => {
            if (res.code === CODE.SUCCESS) {
                //保存到storage
                const info: any = {
                    username: res.data.username,
                    nickname: res.data.nickname,
                    avatar: res.data.avatar,
                    sex: res.data.sex,
                    birth: dayjs(res.data.birth * 1000).format("YYYY/MM/DD"),
                    updateTime: dayjs().format("YYYY/MM/DD HH:mm:ss")
                }
                uni.setStorageSync(UNI_STORAGE.USER_ANYDOOR_INFO, info)
                //加载到pinia
                const userStore = useUserStore()
                userStore.$patch((state) => {
                    for (let key in info) {
                        if (Object.keys(state).includes(key)) {
                            state[key as keyof typeof state] = info[key]
                        }
                    }
                })
            }
        }).catch(e => {
            ToastModule.show({ text: "获取用户信息发生错误!" + e })
        })
    }

}