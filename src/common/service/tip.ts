
import { UNI_STORAGE } from "../database/UNI_STORAGE"
import CODE, { restful } from "../define/code"
import ToastModule from "../native/toast/ToastModule"
import { post } from "../request/http"


export async function listTip(formData: any): Promise<restful<any>> {
    const data: any = await post('tip_list', formData)
    let tipData: any = []
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        tipData = (data.data || []).map((item: any) => {
            return {
                icon: 'tmicon-alert',
                content: item.title
            }
        })
        //缓存
        uni.setStorageSync(UNI_STORAGE.TIP_LIST, JSON.stringify(tipData))
    }
    return tipData
}