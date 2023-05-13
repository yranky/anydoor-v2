/**
 * 解析操作并执行
 */

import { ICallback, ISend, SEND_FUN } from "./types"
import { CODE, CODE_MSG } from './code'
import { IAnydoorWebviewRef } from "../IAnydoorWebview"
import { ILoginResult, ILoginType } from "./IFun"
import { loginCenter } from "@/common/service/login"
import { useUserStore } from "@/store/user"
import { linkBack } from "@/common/utils/link"
import { isEmpty } from "lodash"

type IMETHODS = {
    [key in SEND_FUN]: Function
}

const methods: IMETHODS = {
    [SEND_FUN.LOGIN]: async function (data: { data: { type: ILoginType; code: string } }, mWebview?: IAnydoorWebviewRef): Promise<ILoginResult> {
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
        } else if (data.data.type === ILoginType.TOKEN) {
        } else if (data.data.type === ILoginType.CHECK) {
            success = true
        }
        uni.$anydoor_native.Dialog_Module.hideWaitingDialog({})
        return {
            success,
            isLogin
        }
    },
    [SEND_FUN.HIDE_TITLE_BAR]: async function (data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
        emits && emits("onHideTitleBar")
        return {}
    }, [SEND_FUN.SHOW_TITLE_BAR]: async function (data: any, mWebview?: IAnydoorWebviewRef, emits?: any): Promise<any> {
        emits && emits("onShowTitleBar")
        return {}
    },
    [SEND_FUN.GET_SYSTEM_INFO]: async function (): Promise<any> {
        return uni.getSystemInfoSync()
    },
    [SEND_FUN.PAGE_BACK]: async function (data: any): Promise<any> {
        return linkBack(isEmpty(data.data.delta) ? 1 : data.data.delta)
    }
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