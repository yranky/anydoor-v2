/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-02 21:59:00
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 12:42:53
 * @FilePath: \anydoor-v2\src\common\native\bugly\IBuglyModule.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import IResult from "../IResult"

export interface IBuglyOption {
    deviceId?: String
    appVersion?: String
    deviceModel?: String
    debug?: boolean
}

export interface IBuglyDetail {
    appId: string
    appChannel: string
    appVersion: string
    sdkVersion: string
    deviceId: string
    userId: string
}

export default interface IBuglyModuleNative {
    //初始化
    init(option: IBuglyOption, callbackfn?: (result: IResult<undefined>) => void): void
    //推送消息
    pushData(option: { key: string, value: string }, callbackfn?: (result: IResult<undefined>) => void): void
    //获取信息
    getDetail(callbackfn?: (result: IResult<IBuglyDetail>) => void): void
    //开关调试模式
    setDebug(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    //设置userId
    setUserId(userId: string, callbackfn?: (result: IResult<undefined>) => void): void
}