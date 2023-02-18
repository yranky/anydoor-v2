/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-04 20:28:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 22:10:07
 * @FilePath: \anydoor-v2\src\common\native\bugly\BuglyModule.ts
 * @Description: 初始化
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import config from "../config";
import { debugTool } from "../nativeInit";
import ToastModule from "../toast/ToastModule";
import IBuglyModuleNative from "./IBuglyModule";

export default class BuglyModule {
    // @ts-ignore
    public MODULE: IBuglyModuleNative = uni.requireNativePlugin("anydoor_bugly")
    //bug
    private static instance: BuglyModule | null = null
    //初始化模块
    private constructor() {
        //初始化
        this.MODULE && this.MODULE.init({
            deviceId: config.bugly.deviceId,
            appVersion: config.bugly.appVersion,
            deviceModel: config.bugly.deviceModel,
            debug: config.global.debug
        }, debugTool((res) => {
            if (!res.success) {
                ToastModule.show({
                    text: '统计模块初始化失败!' + res.msg
                })
            }
        }))
    }
    static getInstance(): BuglyModule {
        if (BuglyModule.instance === null) {
            BuglyModule.instance = new BuglyModule()
        }
        return BuglyModule.instance
    }
}