/**
 * 解析操作并执行
 */

import { ICallback, ISend, SEND_FUN } from "./types"
import { CODE, CODE_MSG } from './code'
import { IAnydoorWebviewRef } from "../IAnydoorWebview"

type IMETHODS = {
    [key in SEND_FUN]: Function
}

const methods: IMETHODS = {
    [SEND_FUN.LOGIN]: async function (data: any, mWebview?: IAnydoorWebviewRef): Promise<any> {
        return {}
    },
    [SEND_FUN.HIDE_TITLE_BAR]: async function (data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
        emits && emits("onHideTitleBar")
        return {}
    }, [SEND_FUN.SHOW_TITLE_BAR]: async function (data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
        emits && emits("onShowTitleBar")
        return {}
    },
    [SEND_FUN.GET_SYSTEM_INFO]:async function (): Promise<any> {
        return uni.getSystemInfoSync()
    },
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