/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-04-05 12:00:54
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-05 12:02:34
 * @FilePath: \anydoor-v2\src\router\config.ts
 * @Description: 登录
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import { ROUTE_PATH } from "../ROUTE_PATH"

// 登录形式
export enum AuthMode {
    //需要教务登录
    JIAOWU = "jiaowu",
    //需要登录
    LOGIN = "login",
    //登录之后不能进入
    NOT_LOGIN = "not_login",
    //教务登录之后不能进入
    NOT_JIAOWU_LOGIN = "not_jiaowu_login"
}

//路由配置
export type IRoutes<T extends string | number | symbol> = {
    [key in T]: {
        PATH: key,
        NAME: string,
        AUTH: AuthMode[],
        SEARCH: boolean
    }
}