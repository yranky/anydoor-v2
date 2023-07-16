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
            } else {
                linkTo(ROUTE_PATH.QRCODE_RESULT, { result: res.content })
            }
        })
    }, 1000, { leading: true })

    static scancode(): Promise<IScancodeResult> {
        return new Promise(resolve => {
            Permission.request(PERMISSION_TYPE.CAMERA).then(() => {
                // 允许从相机扫码
                uni.scanCode({
                    onlyFromCamera: true,
                    scanType: ['qrCode'],
                    success: function (res) {
                        console.log(res)
                        resolve({
                            type: res.scanType,
                            content: res.result
                        })
                    },
                    fail: function (res) {
                        if (res.errMsg.indexOf('cancel') <= -1) ToastModule.show({
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