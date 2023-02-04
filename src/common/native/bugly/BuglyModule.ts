import IResult from "../IResult";
import config from "../config";
import { debugTool } from "../nativeInit";
import ToastModule from "../toast/ToastModule";
import IBuglyModuleNative from "./IBuglyModule";

export default class BuglyModule {
    // @ts-ignore
    private static MODULE: IBuglyModuleNative = uni.requireNativePlugin("anydoor_bugly")
    //bug
    private static instance: BuglyModule | null = null
    private __construtor(): void { }

    static getInstance(): BuglyModule {

        if (BuglyModule.instance === null) {
            BuglyModule.instance = new BuglyModule()
            //初始化
            BuglyModule.MODULE && BuglyModule.MODULE.init({
                appId: config.bugly.appId,
                deviceId: config.bugly.deviceId,
                appChannel: config.bugly.appChannel,
                appVersion: config.bugly.appVersion,
                deviceModel: config.bugly.deviceModel,
                debug: config.bugly.debug
            }, debugTool((res) => {
                if (!res.success) {
                    ToastModule.show({
                        text: '统计模块初始化失败!' + res.msg
                    })
                }
            }))
        }
        return BuglyModule.instance
    }
}