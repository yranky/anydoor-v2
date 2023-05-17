/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-05-16 21:24:17
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-16 21:26:32
 * @FilePath: \anydoor-v2\src\common\webviewHandler\webLogin.ts
 * @Description: webview登录相关的
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { useUserStore } from "@/store/user"
import CODE from "../define/code"
import { IAnydoorWebviewRef } from "../native/webview/IAnydoorWebview"
import { ILoginType, ILoginResult } from "./action/IFun"
import { loginCenter } from "../service/login"
import { userScanLogin } from "../service/user"

//登录
export async function webLogin(data: { data: { type: ILoginType; code: string } }, mWebview?: IAnydoorWebviewRef): Promise<ILoginResult> {
    uni.$anydoor_native.Dialog_Module.showWaitingDialog({})
    const userStore = useUserStore()
    let success = false
    let isLogin = userStore.token ? true : false
    if (data.data.type === ILoginType.CENTER) {
        try {
            const res = await loginCenter({ code: data.data.code })
            if (res.code === CODE.SUCCESS) {
                success = true
            }
        } catch { }
        //通过token登录
    } else if (data.data.type === ILoginType.TOKEN) {

        //检测是否登录了
    } else if (data.data.type === ILoginType.CHECK) {
        success = true
        //扫码登录
    } else if (data.data.type === ILoginType.SCAN) {
        //用户扫码登录
        const res = await userScanLogin({ code: data.data.code })
        if (res.code === CODE.SUCCESS) {
            success = true
        }
    }
    uni.$anydoor_native.Dialog_Module.hideWaitingDialog({})
    return {
        success,
        isLogin
    }
}