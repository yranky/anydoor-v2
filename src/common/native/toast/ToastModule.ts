import CODE from "@/common/define/code";
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
    static show(option: IToastShowOption, code?: CODE | number) {
        if (code === 8000 || code === 8001 || code === 8002) return
        uni.$anydoor_native.Toast_Module.show(option, debugTool())
    }
    //取消显示通知
    static hide() {
        uni.$anydoor_native.Toast_Module.hide(debugTool())
    }
}