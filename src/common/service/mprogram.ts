import ToastModule from "@/common/native/toast/ToastModule"
import CODE, { restful } from "@/common/define/code"
import { post } from "@/common/request/http"

//微应用列表操作
export async function listMprogram(formData: any): Promise<restful<any>> {
    const data: any = await post('mprogram_list', formData)
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || []
}