/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-03 10:02:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-03 10:55:10
 * @FilePath: \测试2\common\native\baidu_tongji\BTongjiModule.ts
 * @Description: 百度统计模块
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import IResult from "../IResult";
import config from "../config";
import { debugTool } from "../nativeInit";
import ToastModule from "../toast/ToastModule";
import IBTonbgjiModuleNative from "./IBTongjiModule";


export default class BTongjiModule {
    // @ts-ignore
    private static MODULE: IBTonbgjiModuleNative = uni.requireNativePlugin("anydoor_baidu_tongji")
    //监听
    private static instance: BTongjiModule | null = null
    private __construtor(): void { }
    //初始化
    static getInstance(): BTongjiModule {
        if (BTongjiModule.instance === null) {
            BTongjiModule.instance = new BTongjiModule()
            //初始化
            BTongjiModule.MODULE && BTongjiModule.MODULE.init({
                appId: config.baidu_tongji.appId,
                appChannel: config.baidu_tongji.appChannel,
                appVersion: config.baidu_tongji.appVersion
            }, debugTool<IResult<undefined>>((res) => {
                if (res.success) {
                    //取消掉debug
                    BTongjiModule.MODULE.setAuthorizedState(debugTool(() => {
                        //自动埋点
                        BTongjiModule.MODULE.setAutoTrace(true, debugTool())
                        //允许获取mac地址
                        BTongjiModule.MODULE.setEnableMacId(true, debugTool())
                        //如果全局开启了debug
                        if (config.global.debug === true) BTongjiModule.MODULE.setDebug(true, debugTool())
                        //开始
                        BTongjiModule.MODULE.start(debugTool())
                    }))
                } else {
                    ToastModule.show({
                        text: '统计模块初始化失败!' + res.msg
                    })
                }
            }))
        }
        return BTongjiModule.instance
    }
}