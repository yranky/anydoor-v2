/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-04 20:28:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-13 10:09:52
 * @FilePath: \anydoor-v2\src\common\native\nativeInit.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-04 20:28:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-18 16:52:23
 * @FilePath: \anydoor-v2\src\common\native\nativeInit.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { initAnydoorHostMPInstance } from "../MPHandler/MPHandler";
import MProgram from "../database/mprogram/MProgram";
import IResult from "./IResult";
import BTongjiModule from "./baidu_tongji/BTongjiModule";
import BuglyModule from "./bugly/BuglyModule";
import config from "./config";
import DialogModule from "./dialog/DialogModule";
import DownloadModule from "./download/DownloadModule";
import ToastModule from "./toast/ToastModule";

export default function nativeInit() {
    //初始化native
    uni.$anydoor_native = {
        //数据库模块
        // SQLite_Module: uni.requireNativePlugin("anydoor_sqlite"),
        //加密的
        SQLite_Module: uni.requireNativePlugin("anydoor_sqlite_encrypt"),
        MP: uni.requireNativePlugin('uniMP'),
        BTongji_Module: uni.requireNativePlugin("anydoor_baidu_tongji"),
        Bugly_Module: uni.requireNativePlugin("anydoor_bugly"),
        Download_Module: uni.requireNativePlugin("anydoor_download"),
        Toast_Module: uni.requireNativePlugin("anydoor_toast"),
        Dialog_Module: uni.requireNativePlugin("anydoor_dialog"),
        Tool_Module: uni.requireNativePlugin("anydoor_tool")
    }


    //初始化toast模块
    ToastModule.getInstance()
    //初始化百度统计模块
    BTongjiModule.getInstance()
    //初始化bugly模块
    BuglyModule.getInstance()
    //初始化download模块
    DownloadModule.getInstance()
    //初始化dialog模块
    DialogModule.getInstance()
    //初始化Mprogram
    MProgram.getInstance()
    //初始化小程序通信
    initAnydoorHostMPInstance()
}

//此函数用于调试用，使用此函数包裹，如果处于debug会打印出日志
export function debugTool<T>(res?: (param: T) => void) {
    try {
        if (config.global.debug) {
            // console.log(arguments)
        }
    } catch (e) {
        console.log(e)
    }
    return res
}