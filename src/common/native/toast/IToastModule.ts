import IResult from "../IResult"

export interface IToastShowOption {
    color?: string
    fontSize?: number
    //背景颜色
    background?: string
    borderRadius?: number
    position?: TOAST_POSITION
    text: string
}

export default interface IToastModuleNative {
    //显示通知
    show(option: IToastShowOption, callbackfn?: (result: IResult<undefined>) => void): void
    showSync(option: IToastShowOption): IResult<undefined>
    hide(callbackfn?: (result: IResult<undefined>) => void): void
    hideSync(): IResult<undefined>
}

export enum TOAST_POSITION {
    BOTTOM = "bottom",
    CENTER = "center",
    TOP = "com"
}