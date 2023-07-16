/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-05-16 21:28:08
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-16 21:29:33
 * @FilePath: \anydoor-v2\src\common\webviewHandler\webLink.ts
 * @Description: 跳转相关的
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { isEmpty } from "lodash"
import { linkBack } from "../utils/link"

export async function webLinkBack(data: any): Promise<any> {
    return linkBack(isEmpty(data.data.delta) ? 1 : data.data.delta)
}