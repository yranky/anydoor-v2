import IResult from "../IResult"

export default interface IDialogModuleNative {
    init(option:IDialogInitOption):void;
    //显示普通对话框(alert)
    showMessageDialog(option:IShowMessageDialogOption, callbackfn?: (result: IResult<undefined>) => void): void
    //显示输入对话框
    showInputDialog(option:IShowInputDialogOption, callbackfn?: (result: IResult<IShowInputDialogCallback>) => void,error?: (result: IResult<undefined>) => void): void
}

interface IDialogInitOption{
    //确认按钮的颜色
    okButtonTextColor?:string,
    //其它按钮的颜色
    buttonTextColor?:string

}

interface IShowMessageDialogOption{
    //标题
    title?:string,
    //内容
    content?:string,
    //确认的文本
    okText?:string,
    //是否允许点击蒙层或返回键退出 默认为true
    cancelable?:boolean
}

interface IShowInputDialogOption extends IShowMessageDialogOption{
    // base64图片
    image?:string,
    //取消的文字
    cancelText?:string
}

interface IShowInputDialogCallback{
    type:'cancel'|'ok',
    value:string
}