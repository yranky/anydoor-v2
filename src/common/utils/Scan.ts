import { ROUTE_PATH } from "@/router/ROUTE_PATH";
import ToastModule from "../native/toast/ToastModule";
import { PERMISSION_TYPE } from "../permission/IPermission";
import Permission from "../permission/Permission";
import { linkTo } from "./link";
import { debounce } from "lodash";

// 扫码部分
export default class Scan {

    //首页的扫码服务
    public static indexScan = debounce(() => {
        Scan.scancode().then(res => {
            if (typeof res.content === "string" && res.content.startsWith("http")) {
                linkTo(ROUTE_PATH.WEBVIEW, { url: res.content })
            }
        })
    }, 1000, { leading: true })

    static scancode(): Promise<IScancodeResult> {
        return new Promise(resolve => {
            Permission.request(PERMISSION_TYPE.CAMERA).then(() => {
                // 允许从相机和相册扫码
                uni.scanCode({
                    success: function (res) {
                        resolve({
                            type: res.scanType,
                            content: res.result
                        })
                    },
                    fail: function (res) {
                        ToastModule.show({
                            text: res.errMsg
                        })
                    }
                });
            })
        })
    }
}


interface IScancodeResult {
    type: string,
    content: string
}