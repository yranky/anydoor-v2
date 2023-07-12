import IResult from "../IResult"

export interface IAnydoorWebviewConfig {
    autoBack?: boolean
    autoFocus?: boolean
    javascript?: boolean
    cache?: ICacheMode
    storage?: boolean
    database?: boolean
    zoom?: boolean
    zoomControl?: boolean
    multipleWindow?: boolean
    windowsAutomatically?: boolean
    modeallowLocalPath?: boolean
    scheme?: boolean
    defaultAlert?: boolean,
    height?: number | string,
    progress?: boolean
}


export interface IAnydoorWebviewRef {
    setUserAgent(userAgent: string, callbackFn?: (res: IResult<undefined>) => void): void
    getUserAgent(callbackFn?: (res: IResult<string>) => void): void
    shouldOverrideUrlLoading(option: IShouldOverrideUrlLoadingOption, callbackFn?: (res: IResult<undefined>) => void): void
    getCookie(url: string, callbackFn?: (res: IResult<string>) => void): void
    setCookie(option: ISetCookieOption, callbackFn?: (res: IResult<undefined>) => void): void
    removeAllCookie(callbackFn?: (res: IResult<undefined>) => void): void
    removeCookie(url: string, callbackFn?: (res: IResult<undefined>) => void): void
    removeAllStorage(callbackFn?: (res: IResult<undefined>) => void): void
    setDark(open: boolean, callbackFn?: (res: IResult<undefined>) => void): void
    canBack(callbackFn?: (res: IResult<boolean>) => void): void
    back(callbackFn?: (res: IResult<undefined>) => void): void
    forward(callbackFn?: (res: IResult<undefined>) => void): void
    go(index: number, callbackFn?: (res: IResult<undefined>) => void): void
    reload(callbackFn?: (res: IResult<undefined>) => void): void
    loadUrl(url: string, callbackFn?: (res: IResult<undefined>) => void): void
    clear(disk: boolean, callbackFn?: (res: IResult<undefined>) => void): void
    clearAll(disk: boolean, callbackFn?: (res: IResult<undefined>) => void): void
    clearHistory(callbackFn?: (res: IResult<undefined>) => void): void
    getTitle(callbackFn?: (res: IResult<string>) => void): void
    getUrl(callbackFn?: (res: IResult<string>) => void): void
    stopLoading(callbackFn?: (res: IResult<undefined>) => void): void
    send(data: string, callbackFn?: (res: IResult<string>) => void): void
    callHandler(data: ICallHandlerOption, callbackFn?: (res: IResult<string>) => void): void
    registerHandler(name: string, callbackFn?: (res: IResult<undefined>) => void): void
    hideTitleBar(): void
    postUrl(data: IPostUrlOption, callbackFn?: (res: IResult<undefined>) => void): void
}

export interface IAnydoorEventResult<T> {
    detail: T
}

export interface ICallHandlerOption {
    name: string
    data: string
}

export interface IShouldOverrideUrlLoadingOption {
    base64: boolean
    regs: String[]
    mode: "allow" | String
}

export interface ISetCookieOption {
    url: string
    cookie: string
    reload?: boolean
}

export enum ICacheMode {
    LOAD_DEFAULT = 1,
    LOAD_NO_CACHE = 2,
    LOAD_CACHE_ELSE_NETWORK = 3,
    LOAD_CACHE_ONLY = 4
}

export interface IPageStartResult {
    url: string
}

export interface IOnSchemeResult {
    url: string
}

export interface IUrlLoadingPaternResult {
    url: string
}

export interface IPageReadyResult {
    url: string
}
export interface IPageErrorResult {
    isCurrent: boolean
    currentUrl: string
    url: string
    description: string
    errorCode: number
}

export interface IPageHttpErrorResult {
    isCurrent: boolean
    currentUrl: string
    url: string
    description: string
    errorCode: number
}

export interface IPageSSLErrorResult {
    url: string
    detail: string
}

export interface ILoadResourceResult {
    url: string
}

export interface IDownloadResult {
    url: string
    userAgent: string
    mimeType: string
    contentLength: number
    contentDisposition: string
}

export interface IMessageResult {
    data: string
    url: string
}

export interface INameMessageResult {
    data: string
    url: string
    name: string
}

export interface IOnErrorResult {
    msg: string
    pos: string
}

export interface ITitleUpdateResult {
    title: string
}

export interface IPageAlertResult {
    url: string
    message: string
}

export interface IOnProgressResult {
    url: string
    progress: number
}

export interface IOnConsoleResult {
    msg: string
    line: number
    level: string
}

export interface IOnNewWindowResult {
    url: string
    method: "multiple" | "windowOpen"
    userDone: boolean
}

export interface IOnLinkPressResult {
    url: string
}
export interface IOnImagePressResult {
    url: string
}
export interface IOnLinkClickResult {
    url: string
}
export interface IOnImageClickResult {
    img: string
}

export interface IOnBackResult {

}

export interface IPostUrlOption {
    url: string,
    params: {
        [key: string]: number | string
    }
}