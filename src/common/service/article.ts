/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-19 11:55:28
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-15 20:09:58
 * @FilePath: \anydoor-v2\src\common\service\article.ts
 * @Description: 文章服务
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */


import CODE, { restful } from "../define/code"
import ToastModule from "../native/toast/ToastModule"
import { get, post } from "../request/http"

// 文章列表
export const listArticle = async function (params: any): Promise<restful> {
    const data: any = await post('article_list', params)
    if (data && data.code !== CODE.SUCCESS) {
        //显示错误
        if (data.code !== CODE.SUCCESS) {
            ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
        }
    }
    return data
}

//文章分类
export const typeArticle = async function (params: any): Promise<restful> {
    const data: any = await post('article_type', params)
    if (data && data.code !== CODE.SUCCESS) {
        //显示错误
        if (data.code !== CODE.SUCCESS) {
            ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
        }
    }
    return data
}

//获取文章详情操作
export async function itemArticle(id: string): Promise<restful<any>> {
    const data: any = await post('article_detail', {
        id: id
    })
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || {}
}