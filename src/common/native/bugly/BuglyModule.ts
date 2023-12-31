/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-04 20:28:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-23 10:19:55
 * @FilePath: \anydoor-v2\src\common\native\bugly\BuglyModule.ts
 * @Description: 初始化
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import useConfigStore from "@/store/config";
import config from "../config";
import { debugTool } from "../nativeInit";
import ToastModule from "../toast/ToastModule";
import IBuglyModuleNative from "./IBuglyModule";



export default class BuglyModule {
    //初始化模块
    private constructor() {
        const configStore = useConfigStore()
        //初始化
        uni.$anydoor_native.Bugly_Module && uni.$anydoor_native.Bugly_Module.init({
            deviceId: config.bugly().deviceId,
            appVersion: config.bugly().appVersion,
            deviceModel: config.bugly().deviceModel,
            debug: configStore.debug
        }, debugTool((res) => {
            if (!res.success) {
                ToastModule.show({
                    text: '统计模块初始化失败!' + res.msg
                })
            }
        }))
    }
    static getInstance(): BuglyModule {
        if (uni.$anydoor.BuglyModule === undefined) {
            uni.$anydoor.BuglyModule = new BuglyModule()
        }
        return uni.$anydoor.BuglyModule
    }
}