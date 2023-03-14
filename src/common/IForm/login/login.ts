import { LOGIN_TYPE } from "@/common/define/login"

export type IUserRuleResult = {
    [key in 'username' | 'password' | 'mail' | 'phone']?: IUserRuleResultItem
}

export interface IUserRuleResultItem {
    reg: String,
    msg: String
}

export interface LoginForm {
    username: String,
    device_id: String,
    password: any,
    mail: String,
    phone: String,
    vercode: String,
    code: String,
    type: LOGIN_TYPE,
    user: any
}