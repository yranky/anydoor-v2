//获取的信息
export interface IOnUniMPEventReceiveResult<T> {
    fromAppid: string,
    event: EVENT_TYPE,
    data: IData<T>
}

//数据形式
export interface IData<T> {
    uuid: string,
    code: number,
    msg?: string,
    data: T
}

//教务数据
export interface IJiaowuData {
    isLogin: boolean,
    account: {
        username: string,
        password: string
    },
    config: {
        find_url: string,
        find_alert: string,
        public_key: string,
        user_description: string,
        user_login_description: string,
        user_not_login_description: string,
        cid: string,
        timetable_temp: number,
        plan_temp: number,
        score_temp: number,
        school_name: string
    }
}

//账号信息
export enum EVENT_TYPE {
    //获取app的账号信息
    INFO_APP = "info_app",
    //获取教务信息
    LOGIN_JW = "login_jw",
    //获取token
    LOGIN_TOKEN = "login_token"
}

