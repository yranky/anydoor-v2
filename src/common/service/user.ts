/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-05-10 20:19:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-10 20:19:26
 * @FilePath: \anydoor-v2\src\common\service\user.ts
 * @Description: 用户相关服务
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import CODE, { restful } from "../define/code"
import ToastModule from "../native/toast/ToastModule"
import { post } from "../request/http"

//微应用item
export async function getUserInfoService(formData: any): Promise<restful<any>> {
    const data: any = await post('user_info', formData)
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || {}
}