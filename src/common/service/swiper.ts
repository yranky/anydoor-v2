import CODE, { restful } from "../define/code"
import ToastModule from "../native/toast/ToastModule"
import { post } from "../request/http"

//轮播图列表操作
export async function listSwiper(formData: any): Promise<restful<any>> {
    const data: any = await post('swiper_list', formData)
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || []
}