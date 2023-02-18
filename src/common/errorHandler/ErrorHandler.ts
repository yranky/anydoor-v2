import BuglyModule from "../native/bugly/BuglyModule";

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-13 10:20:40
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-18 17:08:28
 * @FilePath: \anydoor-v2\src\common\errorHandler\ErrorHandler.ts
 * @Description: 错误处理类
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default class ErrorHandler {
    //上报错误
    static push(key: string, value: string) {
        //上报到bugly
        uni.$anydoor_native.Bugly_Module.pushData({
            key,
            value
        })
    }
}