export interface ILoginResult {
    success: boolean,
    isLogin: boolean
}

export enum ILoginType {
    CENTER = "center",
    TOKEN = "token",
    //是否登录
    CHECK = "check"
}