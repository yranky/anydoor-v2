import IResult from "../IResult";

export interface IAnydoorLottieRef {
    play(callbackFn?: (res: IResult<undefined>) => void): void
    playSync(): IResult<undefined>

    resume(callbackFn?: (res: IResult<undefined>) => void): void
    resumeSync(): IResult<undefined>

    pause(callbackFn?: (res: IResult<undefined>) => void): void
    pauseSync(): IResult<undefined>

    setProgress(propgress: number, callbackFn?: (res: IResult<undefined>) => void): void
    setProgressSync(propgress: number): IResult<undefined>

    setFrame(frame: number, callbackFn?: (res: IResult<undefined>) => void): void
    setFrameSync(frame: number): IResult<undefined>

    setRepeatCount(count: number, callbackFn?: (res: IResult<undefined>) => void): void
    setRepeatCountSync(count: number): IResult<undefined>

    setSpeed(speed: number, callbackFn?: (res: IResult<undefined>) => void): void
    setSpeedSync(speed: number): IResult<undefined>

    getDetail(callbackFn?: (res: IResult<ILottieDetailResult>) => void): void
    getDetailSync(): IResult<ILottieDetailResult>
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