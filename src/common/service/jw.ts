import CODE, { restful } from "@/common/define/code"
import ToastModule from "@/common/native/toast/ToastModule"
import { post } from "@/common/request/http"

//教务配置操作
export async function jwConfig(formData: any): Promise<any> {
    const data: any = await post('jw_config', formData)

    let jwConfig = {}
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        jwConfig = data.data
    }
    return jwConfig
}

//登录
export async function jwLogin(formData: any): Promise<any> {
    const data: any = await post('jw_login', formData)
    console.log(data)

    let jwConfig = {}
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        jwConfig = data.data
    }
    return jwConfig
}