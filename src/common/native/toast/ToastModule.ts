import { debugTool } from "../nativeInit";
import IToastModuleNative, { IToastShowOption } from "./IToastModule";

export default class ToastModule {
    // @ts-ignore
    private static MODULE: IToastModuleNative = uni.requireNativePlugin("anydoor_toast")

    //监听
    private static instance: ToastModule | null = null
    private constructor() { }

    static getInstance(): ToastModule {
        if (ToastModule.instance === null) {
            ToastModule.instance = new ToastModule()
        }


        return ToastModule.instance
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