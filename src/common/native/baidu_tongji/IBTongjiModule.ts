/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-04 20:28:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-22 15:38:06
 * @FilePath: \anydoor-v2\src\common\native\baidu_tongji\IBTongjiModule.ts
 * @Description: 百度统计接口
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import IResult from "../IResult"



export interface IBTongjiOption {
    appVersion?: string
}

export default interface IBTonbgjiModuleNative {
    //初始化
    init(option: IBTongjiOption, callbackfn?: (result: IResult<undefined>) => void): void
    //初始化(同步)
    initSync(option: IBTongjiOption): IResult<undefined>
    //已经通过隐私协议
    setAuthorizedState(callbackfn?: (result: IResult<undefined>) => void): void
    //已经通过隐私协议(同步)
    setAuthorizedStateSync(): IResult<undefined>
    //开启自动埋点
    setAutoTrace(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    //开启自动埋点(同步)
    setAutoTraceSync(open: boolean): IResult<undefined>
    //开启统计
    start(callbackfn?: (result: IResult<undefined>) => void): void
    startSync(): IResult<undefined>
    //打开统计调试页面
    startDebugPage(callbackfn?: (result: IResult<undefined>) => void): void
    startDebugPageSync(): IResult<undefined>
    //开启调试
    setDebug(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    setDebugSync(open: boolean): IResult<undefined>
    //访客模式
    setBrowseMode(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    setBrowseModeSync(open: boolean): IResult<undefined>
    //设置userId
    setUserId(userId: string, callbackfn?: (result: IResult<undefined>) => void): void
    setUserIdSync(userId: string): IResult<undefined>
    //允许获取用户macid
    setEnableMacId(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    setEnableMacIdSync(open: boolean): IResult<undefined>
    //创建一个无时长的自定义事件
    onEvent(option: IEvent, callbackfn?: (result: IResult<undefined>) => void): void
    onEventSync(option: IEvent): IResult<undefined>
    //创建一个固定时长的event
    onEventDuration(option: IEventDuration, callbackfn?: (result: IResult<undefined>) => void): void
    onEventDurationSync(option: IEventDuration): IResult<undefined>
    //创建一个不定时长的Event
    onEventStart(option: IEventBase, callbackfn?: (result: IResult<undefined>) => void): void
    onEventEnd(option: IEventBase, callbackfn?: (result: IResult<undefined>) => void): void
    onEventStartSync(option: IEventBase): IResult<undefined>
    onEventEndSync(option: IEventBase): IResult<undefined>
    //获取信息
    getDetail(callbackfn?: (result: IResult<IBTongjiDetail>) => void): void
    getDetailSync(): IResult<IBTongjiDetail>
}

export interface IBTongjiDetail {
    appKey: string,
    sdkVersion: string,
    testDeviceId: string
}

export interface IEventBase {
    eventId: string
    label: string
    //其它的attributes
    attributes?: {
        [key: string]: string
    }
}

export interface IEvent extends IEventBase {
    //触发次数
    acc?: number
}

export interface IEventDuration extends IEventBase {
    milliseconds?: number
}