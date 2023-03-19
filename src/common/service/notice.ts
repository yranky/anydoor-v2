import ToastModule from "@/common/native/toast/ToastModule"
import CODE, { restful } from "@/common/define/code"
import { post } from "@/common/request/http"

//通知列表操作
export async function listNotice(formData: any): Promise<restful<any>> {
    const data: any = await post('notice_list', formData)
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || {}
}

//获取通知详情操作
export async function itemNotice(id: string): Promise<restful<any>> {
    const data: any = await post('notice_detail', {
        id: id
    })
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || {}
}