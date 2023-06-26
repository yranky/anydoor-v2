import { throttle } from "lodash"
import CODE, { restful } from "../define/code"
import ToastModule from "../native/toast/ToastModule"
import { post } from "../request/http"

//墙纸列表
export const listWallpaper = throttle(async (formData: any): Promise<any[]> => {
    const data: any = await post('wallpaper_list', formData)
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    console.log(data)
    return data.data || []
})