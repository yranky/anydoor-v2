import { debugTool } from "../nativeInit";
import IToastModuleNative, { IToastShowOption } from "./IToastModule";

export default class ToastModule {
    private constructor() { }

    static getInstance(): ToastModule {
        if (uni.$anydoor.ToastModule === undefined) {
            uni.$anydoor.ToastModule = new ToastModule()
        }
        return uni.$anydoor.ToastModule
    }

    //显示通知
    static show(option: IToastShowOption) {
        uni.$anydoor_native.Toast_Module.show(option, debugTool())
    }
    //取消显示通知
    static hide() {
        uni.$anydoor_native.Toast_Module.hide(debugTool())
    }
}