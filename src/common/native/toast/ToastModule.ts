import { debugTool } from "../nativeInit";
import IToastModuleNative, { IToastShowOption } from "./IToastModule";

export default class ToastModule {
    // @ts-ignore
    private static MODULE: IToastModuleNative = uni.requireNativePlugin("anydoor_toast")

    private constructor() { }

    static getInstance(): ToastModule {
        if (uni.$anydoor.ToastModule === undefined) {
            uni.$anydoor.ToastModule = new ToastModule()
        }
        return uni.$anydoor.ToastModule
    }

    //显示通知
    static show(option: IToastShowOption) {
        ToastModule.MODULE.show(option, debugTool())
    }
    //取消显示通知
    static hide() {
        ToastModule.MODULE.hide(debugTool())
    }
}