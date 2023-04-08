
import CODE, { restful } from "@/common/define/code"
import ToastModule from "@/common/native/toast/ToastModule"
import { post } from "@/common/request/http"
import { UNI_STORAGE } from "@/common/database/UNI_STORAGE"
// 获取拼音
import { pinyin } from 'pinyin-pro';

export async function listCompany(formData: any): Promise<restful<any>> {
    const data: any = await post('company_list', formData)
    let companys: any = []
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        companys = (data.data || []).map((item: any) => {
            const arr = pinyin(item.name, { pattern: 'first', toneType: 'none', type: 'array' })
            return {
                cid: item.cid,
                name: item.name,
                index: arr[0] || '#'
            }
        })
        //比较首字母大小并排序
        companys.sort((a: any, b: any) => {
            return a.index.charCodeAt() - b.index.charCodeAt()
        })
        //缓存
        uni.setStorageSync(UNI_STORAGE.COMPANY_LIST, JSON.stringify(companys))
    }
    return companys
}