/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-04-02 13:31:21
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-05 11:24:09
 * @FilePath: \anydoor-v2\src\common\service\jw.ts
 * @Description: 教务
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import CODE, { restful } from "@/common/define/code"
import ToastModule from "@/common/native/toast/ToastModule"
import { post } from "@/common/request/http"

//教务配置操作
export async function jwConfig(formData: any): Promise<any> {
    const data: any = await post('jw_config', formData)
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data
}

//登录
export async function jwLogin(formData: any): Promise<any> {
    const data: any = await post('jw_login', formData)

    let jwConfig = {}
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        jwConfig = data.data
    }
    return jwConfig
}