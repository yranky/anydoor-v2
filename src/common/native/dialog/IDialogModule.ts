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
    //显示加载框(同步)
    showWaitingDialogSync(option: IShowWaitingDialogOption): IShowWaitingDialogSyncResult
    //隐藏加载框(同步)
    hideWaitingDialogSync(option: IHideWaitingDialogDialogOption): IHideWaitingDialogSyncResult
    //显示弹出选择框
    showShareMenuDialog(option: IShareMenuDialogDialogOption, callbackfn?: (result: IResult<IShareMenuDialogDialogCallback>) => void): void
    //显示单选弹出框
    showRadioDialog(option: IRadioDialogDialogOption, callbackfn?: (result: IResult<IRadioDialogDialogCallback>) => void): void
    //多选
    showCheckboxDialog(option: ICheckboxDialogDialogOption, callbackfn?: (result: IResult<ICheckboxDialogDialogCallback>) => void): void
    //更新器
    showUpdateDialog(option: IUpdateDialogOption, callbackfn?: (result: IResult<IUpdateDialogCallback>) => void): void
    //设置主题
    setDarkModeSync(dark: boolean): ISetDarkModeSyncResult
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
    type: 'cancel' | 'ok' | 'mask',
    value: string
}

interface IMessageDialogCallback {
    type: 'cancel' | 'ok' | 'mask'
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
    // type: 'cancel' | 'ok' | 'mask'
}


interface IShareMenuDialogDialogOption {
    items: string[],
    //是否可取消
    cancelable?: boolean,
    title?: string,
    content?: string
}

interface IShareMenuDialogDialogCallback {
    type: 'cancel' | 'ok' | 'mask',
    which?: number,
    label?: string
}

interface IRadioDialogDialogOption extends IShareMenuDialogDialogOption {
    default?: number,
    okText?: string
}

interface IRadioDialogDialogCallback {
    type: 'cancel' | 'ok' | 'mask',
    which?: number,
    label?: string
}

interface ICheckboxDialogDialogOption {
    items: string[],
    //是否可取消
    cancelable?: boolean,
    title?: string,
    content?: string,
    default?: number[],
    okText?: string
}


interface ICheckboxDialogDialogCallback {
    type: 'cancel' | 'ok' | 'mask',
    which?: number[],
    label?: string[]
}


interface IUpdateDialogOption {
    isWifiOnly?: boolean,
    //下载链接
    downloadUrl: string,
    //是否可忽略
    isIgnorable: boolean,
    //版本号
    versionCode: number,
    //版本名称
    versionName: string,
    //版本日志
    log: string
}

interface IUpdateDialogCallback {
    type: 'cancel' | 'ok' | 'mask'
}


interface IDialogReultSync {
    success: boolean
    error?: string
}

interface IShowWaitingDialogSyncResult extends IDialogReultSync {

}

interface IHideWaitingDialogSyncResult extends IDialogReultSync {

}

interface ISetDarkModeSyncResult extends IDialogReultSync {

}