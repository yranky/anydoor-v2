import IResult from "../IResult"

export default interface IDialogModuleNative {
    init(option: IDialogInitOption): void;
    //显示普通对话框(alert)
    showMessageDialog(option: IShowMessageDialogOption, callbackfn?: (result: IResult<IMessageDialogCallback>) => void): void
    //显示输入对话框
    showInputDialog(option: IShowInputDialogOption, callbackfn?: (result: IResult<IShowInputDialogCallback>) => void): void
    //显示加载框
    showWaitingDialog(option: IShowWaitingDialogOption): void
    //隐藏加载框
    hideWaitingDialog(option: IHideWaitingDialogDialogOption): void
    //显示弹出选择框
    showShareMenuDialog(option: IShareMenuDialogDialogOption, callbackfn?: (result: IResult<IShareMenuDialogDialogCallback>) => void): void
}

interface IDialogInitOption {
    //确认按钮的颜色
    okButtonTextColor?: string,
    //其它按钮的颜色
    buttonTextColor?: string
}

interface IShowMessageDialogOption {
    //标题
    title?: string,
    //内容
    content?: string,
    //确认的文本
    okText?: string,
    //是否允许点击蒙层或返回键退出 默认为true
    cancelable?: boolean,
    //取消的文字
    cancelText?: string,
}

interface IShowInputDialogOption extends IShowMessageDialogOption {
    // base64图片
    image?: string,
    //取消的文字
    cancelText?: string,
    //默认的内容
    defaultStr?: string
}

interface IShowInputDialogCallback {
    type: 'cancel' | 'ok',
    value: string
}

interface IMessageDialogCallback {
    type: 'cancel' | 'ok'
}

//加载框
interface IShowWaitingDialogOption {
    //标题
    title?: string,
    //进度
    percent?: number,
    //是否可取消
    cancelable?: boolean
}

interface IHideWaitingDialogDialogOption {

}


interface IShareMenuDialogDialogOption {
    items: string[],
    //是否可取消
    cancelable?: boolean
}

interface IShareMenuDialogDialogCallback {
    type: 'cancel' | 'ok',
    which?: string,
    label?: string
}