import IResult from "../IResult"

export default interface IDialogModuleNative {
    showMessageDialog(option:IShowMessageDialogOption, callbackfn?: (result: IResult<undefined>) => void): void
}

interface IShowMessageDialogOption{
    title?:string,
    content?:string,
    okText?:string
}