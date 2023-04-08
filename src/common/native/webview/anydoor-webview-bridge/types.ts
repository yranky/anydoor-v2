import { CODE } from "./code"

export enum SEND_FUN {
    //登录请求
    LOGIN = "fun_login"
}


//发送的数据规范
export interface ISend {
    //方法名
    name: SEND_FUN,
    //发送的数据
    data: any,
    //发送的id,用于回调
    call_id: String
}

//接收的数据规范
export interface ICallback<T> {
    //数据
    data: T,
    //状态码
    code: CODE,
    //回复的uuid
    call_id: String,
    //错误原因
    msg: String
}