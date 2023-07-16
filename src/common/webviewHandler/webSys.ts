/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-05-16 21:30:03
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-16 21:30:40
 * @FilePath: \anydoor-v2\src\common\webviewHandler\webSys.ts
 * @Description: 系统信息
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default async function webSysInfo(): Promise<any> {
    return uni.getSystemInfoSync()
}