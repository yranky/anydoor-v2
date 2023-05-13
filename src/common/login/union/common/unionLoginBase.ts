import { LOGIN_UNION_TYPE } from "@/common/define/login"
import qq from "../qq"
import weibo from "../weibo"
import { GLOABAL_EVENT } from "@/common/define/IGlobalEvent"

export default async function unionLoginBase(type: LOGIN_UNION_TYPE) {
    try {
        uni.$anydoor_native.Dialog_Module.showWaitingDialog({})
        uni.$once(GLOABAL_EVENT.APP_SHOW, () => {
            uni.$anydoor_native.Dialog_Module.hideWaitingDialog({})
        })
        // qq登录
        if (type === LOGIN_UNION_TYPE.QQ) {
            await qq()
        } else if (type === LOGIN_UNION_TYPE.WEIBO) {
            await weibo()
        }
    } catch { }
    uni.$anydoor_native.Dialog_Module.hideWaitingDialog({})
}