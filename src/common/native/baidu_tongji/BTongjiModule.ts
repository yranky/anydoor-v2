/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-03 10:02:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-18 15:42:01
 * @FilePath: \anydoor-v2\src\common\native\baidu_tongji\BTongjiModule.ts
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
    public MODULE: IBTonbgjiModuleNative = uni.requireNativePlugin("anydoor_baidu_tongji")
    private constructor() {
        //初始化
        this.MODULE && this.MODULE.init({
            appVersion: config.baidu_tongji.appVersion
        }, debugTool<IResult<undefined>>((res) => {
            if (res.success) {
                //取消掉debug
                this.MODULE.setAuthorizedState(debugTool(() => {
                    //允许获取mac地址
                    this.MODULE.setEnableMacId(true, debugTool())
                    //如果全局开启了debug
                    if (config.global.debug === true) this.MODULE.setDebug(true, debugTool())
                    //开始
                    this.MODULE.start(debugTool())
                }))
            } else {
                ToastModule.show({
                    text: '统计模块初始化失败!' + res.msg
                })
            }
        }))
    }
    //初始化
    static getInstance(): BTongjiModule {
        if (uni.$anydoor.BTongjiModule === undefined) {
            uni.$anydoor.BTongjiModule = new BTongjiModule()
        }
        return uni.$anydoor.BTongjiModule
    }
}