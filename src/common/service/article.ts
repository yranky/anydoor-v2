/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:54:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-11 21:54:49
 * @FilePath: \anydoor-v2\src\common\service\article.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import CODE, { restful } from "../define/code"
import { get, post } from "../request/http"

export const listArticle = async function (params: any): Promise<restful> {
    const data: any = await get('article_list', params)
    if (data && data.code !== CODE.SUCCESS) {
        //显示错误
    }
    return data
}