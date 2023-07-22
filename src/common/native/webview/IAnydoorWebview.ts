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
    progress?: boolean,
    //禁用https加载http资源
    setBlockNetworkImage?: boolean
}


export interface IAnydoorWebviewRef {
    getUserAgent(callbackFn?: (res: IResult<string>) => void): void
    getUserAgentSync(): IResult<string>

    setUserAgent(userAgent: string, callbackFn?: (res: IResult<undefined>) => void): void
    setUserAgentSync(userAgent: string): IResult<undefined>

    shouldOverrideUrlLoading(option: IShouldOverrideUrlLoadingOption, callbackFn?: (res: IResult<undefined>) => void): void
    shouldOverrideUrlLoadingSync(option: IShouldOverrideUrlLoadingOption): IResult<undefined>

    getCookie(url: string, callbackFn?: (res: IResult<string>) => void): void
    getCookieSync(url: string): IResult<string>

    setCookie(option: ISetCookieOption, callbackFn?: (res: IResult<undefined>) => void): void
    setCookieSync(option: ISetCookieOption): IResult<undefined>

    removeAllCookie(callbackFn?: (res: IResult<undefined>) => void): void
    removeAllCookieSync(): IResult<undefined>

    removeCookie(url: string, callbackFn?: (res: IResult<undefined>) => void): void
    removeCookieSync(url: string): IResult<undefined>

    removeAllStorage(callbackFn?: (res: IResult<undefined>) => void): void
    removeAllStorageSync(): IResult<undefined>

    setDark(open: boolean, callbackFn?: (res: IResult<undefined>) => void): void
    setDarkSync(open: boolean): IResult<undefined>

    canBack(callbackFn?: (res: IResult<boolean>) => void): void
    canBackSync(): IResult<boolean>

    back(callbackFn?: (res: IResult<undefined>) => void): void
    backSync(): IResult<undefined>

    forward(callbackFn?: (res: IResult<undefined>) => void): void
    forwardSync(): IResult<undefined>

    go(index: number, callbackFn?: (res: IResult<undefined>) => void): void
    goSync(index: number): IResult<undefined>

    reload(callbackFn?: (res: IResult<undefined>) => void): void
    reloadSync(): IResult<undefined>

    loadUrl(url: string, callbackFn?: (res: IResult<undefined>) => void): void
    loadUrlSync(url: string): IResult<undefined>

    clear(disk: boolean, callbackFn?: (res: IResult<undefined>) => void): void
    clearSync(disk: boolean): IResult<undefined>

    clearAll(disk: boolean, callbackFn?: (res: IResult<undefined>) => void): void
    clearAllSync(disk: boolean): IResult<undefined>

    clearHistory(callbackFn?: (res: IResult<undefined>) => void): void
    clearHistorySync(): IResult<undefined>

    getTitle(callbackFn?: (res: IResult<string>) => void): void
    getTitleSync(): IResult<string>

    getUrl(callbackFn?: (res: IResult<string>) => void): void
    getUrlSync(): IResult<string>

    stopLoading(callbackFn?: (res: IResult<undefined>) => void): void
    stopLoadingSync(): IResult<undefined>

    send(data: string, callbackFn?: (res: IResult<string>) => void): void
    callHandler(data: ICallHandlerOption, callbackFn?: (res: IResult<string>) => void): void
    registerHandler(name: string, callbackFn?: (res: IResult<undefined>) => void): void
    hideTitleBar(): void

    postUrl(data: IPostUrlOption, callbackFn?: (res: IResult<undefined>) => void): void
    postUrlSync(data: IPostUrlOption): IResult<undefined>
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