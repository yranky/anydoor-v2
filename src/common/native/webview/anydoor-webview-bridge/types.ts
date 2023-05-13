import { CODE } from "./code"

export enum SEND_FUN {
    //登录请求
    LOGIN = "fun_login",
    //隐藏titleBar
    HIDE_TITLE_BAR = "fun_hide_title_bar",
    //显示titleBar
    SHOW_TITLE_BAR = 'fun_show_title_bar',
    //获取信息
    GET_SYSTEM_INFO = 'fun_get_system_info',
    //返回(非webview内网页返回)
    PAGE_BACK = "fun_page_back"
}


//发送的数据规范
export interface ISend {
    //方法名
    name: SEND_FUN,
    //发送的数据
    data: any,
    //发送的id,用于回调
    call_id: string
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