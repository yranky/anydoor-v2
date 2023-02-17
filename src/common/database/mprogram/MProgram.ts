/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 15:50:28
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 22:17:53
 * @FilePath: \anydoor-v2\src\common\database\mprogram\MProgram.ts
 * @Description: 微应用(单例模式)
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import SQLite from "../../sql/SQLite"
import databases, { DATA } from "../database"
import { position } from "../../toast/interface/define"
import Toast from "../../toast/toast"
import { MPROGRAM_TABLES_NAME } from "../tables/mprogram"


export default class MProgram {
    //小程序模块
    private static MP = uni.requireNativePlugin('uniMP')
    //最大的重试次数
    private static MAX_TIMES = 5
    //重试的次数
    private times = 0
    //对象
    private static instance: MProgram | null = null
    //sqlite对象
    private sql: SQLite | undefined

    //获取实例对象
    static async getInstance() {
        if (MProgram.instance === null) {
            MProgram.instance = new MProgram()
            //初始化sql
            MProgram.instance.sql = new SQLite(DATA.MPROGRAM)
            //等待创建完成
            await MProgram.instance.initDataTable()
        }
        return MProgram.instance
    }
    //构造函数
    private constructor() {
        //如果没有就重新加载
        if (!MProgram.MP) this.reloadMP()
    }
    //启动应用
    start(appid: string, path?: string, password?: string, option: IMProgramOpenOption = {}): Promise<IMProgramStatusResult> {
        return new Promise((resolve) => {
            MProgram.MP.openUniMP({
                appid,
                ...option
            }, async (e: any) => {
                //如果是未安装的问题
                if (e.code === -1001) {
                    if (appid && path) {
                        const result = await this.install(appid, path, password)
                        if (result.code === MPROGRAM_STATUS_CODE.SUCCSS) this.start(appid, path, password, option)
                        else resolve(result)
                    }
                }
                //另外一条
                if (e.code !== 0) {
                    resolve({
                        code: MPROGRAM_STATUS_CODE.FAIL,
                        msg: e.msg,
                        error: e
                    })
                }
            })
            resolve({
                code: MPROGRAM_STATUS_CODE.SUCCSS
            })
        })
    }
    //安装应用
    install(appid: string, path: string, password?: string): Promise<IMProgramStatusResult> {
        return new Promise((resolve) => {
            MProgram.MP.installUniMP({
                appid: appid,
                wgtFile: path,
                password
            }, (msg: any) => {
                resolve({
                    code: MPROGRAM_STATUS_CODE.FAIL,
                    msg: msg
                })
            })
            resolve({
                code: MPROGRAM_STATUS_CODE.SUCCSS
            })
        })
    }

    //重新加载 小程序模块
    reloadMP() {
        this.times++
        if (!MProgram.MP) {
            Toast.show({
                text: "模块加载失败，请尝试应用升级版本,重试:" + this.times,
                postion: position.center
            })
            if (this.times <= MProgram.MAX_TIMES) this.reloadMP()
        }
        MProgram.MP = uni.requireNativePlugin('uniMP')
    }
    //初始化小程序表
    async initDataTable() {
        return await this.sql!.executeSql([databases[DATA.MPROGRAM].tables[MPROGRAM_TABLES_NAME.PROGRAM].init])
    }

    //获取小程序列表
    async getAppList() {
        return await this.sql!.selectSql("select * from " + MPROGRAM_TABLES_NAME.PROGRAM)
    }
}


export enum MPROGRAM_STATUS_CODE {
    SUCCSS = 200,
    FAIL = 1
}

export interface IMProgramStatusResult {
    code: MPROGRAM_STATUS_CODE,
    msg?: any,
    error?: any
}

export enum MPROGRAM_SCENE {
    DEFAULT = "default"
}

export interface IMProgramOpenOption {
    //打开的图标
    icon?: string
    //extradata,额外的数据
    extradata?: any
    //来源的appid
    fromAppid?: string
    //场景
    scene?: MPROGRAM_SCENE
    //启动小程序的动画方式（IOS）
    openMode?: "present" | "push"
    //是否开启手势关闭小程序（IOS）
    enableGestureClose?: boolean
    //是否开启打开小程序时的动画（IOS）
    enableShowAnimated?: boolean
    //是否开启关闭小程序时的动画（IOS）
    enableHideAnimated?: boolean
    //是否开启小程序后台运行能力
    enableBackground?: boolean
}