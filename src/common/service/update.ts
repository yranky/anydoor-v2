/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-07-16 10:12:14
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-17 20:39:30
 * @FilePath: \anydoor-v2\src\common\service\update.ts
 * @Description: 检查更新
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import CODE, { restful } from "@/common/define/code"
import ToastModule from "@/common/native/toast/ToastModule"
import { post } from "@/common/request/http"

//检查更新
export async function updateCheck(formData: any): Promise<any> {
    try {
        const data: any = await post('update_check', formData)
        if (data.code !== CODE.SUCCESS) {
            ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
        }
        return data
    } catch (err) {
        return Promise.reject(err)
    }
}