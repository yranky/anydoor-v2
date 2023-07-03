import CODE, { restful } from "../define/code"
import ToastModule from "../native/toast/ToastModule"
import { post } from "../request/http"




export const authOpenid = async function (params: any): Promise<restful> {
    const data: any = await post('auth_openid', params)
    if (data && data.code !== CODE.SUCCESS) {
        //显示错误
        if (data.code !== CODE.SUCCESS) {
            ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
        }
    }
    return data
}