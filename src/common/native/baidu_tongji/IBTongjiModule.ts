import IResult from "../IResult"



export interface IBTongjiOption {
    appId: string
    appChannel: string
    appVersion?: string
}

export default interface IBTonbgjiModuleNative {
    //初始化
    init(option: IBTongjiOption, callbackfn?: (result: IResult<undefined>) => void): void
    //已经通过隐私协议
    setAuthorizedState(callbackfn?: (result: IResult<undefined>) => void): void
    //开启自动埋点
    setAutoTrace(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    //开启统计
    start(callbackfn?: (result: IResult<undefined>) => void): void
    //打开统计调试页面
    startDebugPage(callbackfn?: (result: IResult<undefined>) => void): void
    //开启调试
    setDebug(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    //访客模式
    setBrowseMode(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    //设置userId
    setUserId(userId: string, callbackfn?: (result: IResult<undefined>) => void): void
    //允许获取用户macid
    setEnableMacId(open: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    //创建一个无时长的自定义事件
    onEvent(option: IEvent, callbackfn?: (result: IResult<undefined>) => void): void
    //创建一个固定时长的event
    onEventDuration(option: IEventDuration, callbackfn?: (result: IResult<undefined>) => void): void
    //创建一个不定时长的Event
    onEventStart(option: IEventBase, callbackfn?: (result: IResult<undefined>) => void): void
    onEventEnd(option: IEventBase, callbackfn?: (result: IResult<undefined>) => void): void
    //获取信息
    getDetail(callbackfn?: (result: IResult<IBTongjiDetail>) => void): void
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