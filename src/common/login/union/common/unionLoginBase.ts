import { LOGIN_UNION_TYPE } from "@/common/define/login"
import qq from "../qq"
import weibo from "../weibo"

export default async function unionLoginBase(type: LOGIN_UNION_TYPE) {
    try {
        uni.$anydoor_native.Dialog_Module.showWaitingDialog({})
        uni.$once("appShow", () => {
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