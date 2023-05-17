/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-05-16 21:25:51
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-17 11:25:06
 * @FilePath: \anydoor-v2\src\common\webviewHandler\webTitleBar.ts
 * @Description: titlebar相关的
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import ToastModule from "../native/toast/ToastModule"
import { IAnydoorWebviewRef } from "../native/webview/IAnydoorWebview"
import { SHARE_TYPE, Share } from "../utils/Share"
import { linkBack } from "../utils/link"
import { MENU_ITEM } from "./action/IFun"

// 隐藏
export async function webHideTitleBar(data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
    emits && emits("onHideTitleBar")
    return {}
}
// 显示
export async function webShowTitleBar(data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
    emits && emits("onShowTitleBar")
    return {}
}

//隐藏titleBar的一些item
export async function webHideTitleBarItem(data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
    emits && emits("onHideTitleBarItem", data.data.items || [])
    return {}
}


//处理webview的method
export async function webviewMenuHandler(action: MENU_ITEM, webview: any) {
    switch (action) {
        case MENU_ITEM.FRESH:
            return fresh(webview)
        case MENU_ITEM.CLOSE:
            return linkBack()
        case MENU_ITEM.COPY:
            return copy(webview)
        case MENU_ITEM.OPEN_BROWSER:
            return openUrl(webview)
        case MENU_ITEM.SHARE:
            return share(SHARE_TYPE.SHARE, webview)
        case MENU_ITEM.SHARE_ON_QQ:
            return share(SHARE_TYPE.QQ, webview)
        // case MENU_ITEM.SHARE_ON_QQ_ZONE:
        //     return share(SHARE_TYPE.QQ_ZONE, webview)
        case MENU_ITEM.SHARE_ON_WEIBO:
            return share(SHARE_TYPE.WEIBO, webview)
    }
}

//刷新
export function fresh(webview: any) {
    return webview && webview.reload()
}

//复制
export function copy(webview: any) {
    return new Promise((resolve, reject) => {
        webview && webview.getUrl().then((res: string | undefined) => {
            uni.setClipboardData({
                showToast: false,
                data: res || "",
                success: function () {
                    ToastModule.show({
                        text: '复制成功!'
                    })
                    resolve({})
                },
                fail(result) {
                    reject(result)
                    ToastModule.show({
                        text: '复制失败!' + result.errMsg
                    })
                },
            });
        })
    })
}

//外部打开
export function openUrl(webview: any) {
    return new Promise((resolve) => {
        webview && webview.getUrl().then((res: string | undefined) => {
            plus.runtime.openURL(res || "")
            resolve({})
        })
    })
}

//分享
export function share(type: SHARE_TYPE, webview: any) {
    return new Promise((resolve) => {
        webview && webview.getUrl().then((url: string | undefined) => {
            webview.getTitle().then((title: string | undefined) => {
                return resolve(Share.shareText(type, title || "", url || ""))
            })
        })
    })
}
