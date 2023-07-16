/**
 * 解析操作并执行
 */

import { ICallback, ISend, SEND_FUN } from "./types"
import { CODE, CODE_MSG } from './code'
import { IAnydoorWebviewRef } from "../../native/webview/IAnydoorWebview"
import { webLinkBack } from "@/common/webviewHandler/webLink"
import { webLogin } from "@/common/webviewHandler/webLogin"
import { webHideTitleBar, webHideTitleBarItem, webShowTitleBar } from "@/common/webviewHandler/webTitleBar"
import webSysInfo from "@/common/webviewHandler/webSys"

type IMETHODS = {
    [key in SEND_FUN]: Function
}

const methods: IMETHODS = {
    [SEND_FUN.LOGIN]: webLogin,
    [SEND_FUN.HIDE_TITLE_BAR]: webHideTitleBar,
    [SEND_FUN.SHOW_TITLE_BAR]: webShowTitleBar,
    [SEND_FUN.GET_SYSTEM_INFO]: webSysInfo,
    [SEND_FUN.PAGE_BACK]: webLinkBack,
    [SEND_FUN.HIDE_TITLE_BAR_ITEM]: webHideTitleBarItem
}


export default class WebviewAction {
    //解析数据
    async parse(data: ISend, mWebview: IAnydoorWebviewRef, emits: any): Promise<ICallback<any>> {
        let result: any = {}
        let code: CODE = CODE.SUCCESS
        if (methods[data.name] && typeof methods[data.name] === "function") {
            try {
                result = await methods[data.name].call(this, data, mWebview, emits)
            } catch (e: any) {
                return this.filterData(result, data.call_id, CODE.FAIL_ON_CALL, e)
            }
        } else {
            return this.filterData(result, data.call_id, CODE.FAIL_NOT_SUPPROT)
        }
        return this.filterData(result, data.call_id, code)
    }

    //渲染数据
    filterData(data: any, call_id: string, code: CODE = CODE.SUCCESS, msg: string = ''): ICallback<any> {
        return {
            data,
            code: code,
            call_id,
            msg: msg || CODE_MSG[code]
        }
    }
}