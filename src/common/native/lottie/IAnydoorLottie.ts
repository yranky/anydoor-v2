import IResult from "../IResult";

export interface IAnydoorLottieRef {
    play(callbackFn?: (res: IResult<undefined>) => void): void
    resume(callbackFn?: (res: IResult<undefined>) => void): void
    pause(callbackFn?: (res: IResult<undefined>) => void): void
    setProgress(propgress: number, callbackFn?: (res: IResult<undefined>) => void): void
    setFrame(frame: number, callbackFn?: (res: IResult<undefined>) => void): void
    setRepeatCount(count: number, callbackFn?: (res: IResult<undefined>) => void): void
    setSpeed(speed: number, callbackFn?: (res: IResult<undefined>) => void): void
    getDetail(callbackFn?: (res: IResult<ILottieDetailResult>) => void): void
}

export interface ILottieDetailResult {
    duration: number
    frame: number
    progress: number
    repeatCount: number
    speed: number
    animating: boolean
    loop: boolean
    autoPlay: boolean
}

export interface ILottieOnErrorResult {
    method: string,
    msg: string,
    detail: string
}


export interface ILottieOnUpdateResult {
    currentTime: number
}