/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-03 10:02:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-23 10:24:06
 * @FilePath: \anydoor-v2\src\common\native\baidu_tongji\BTongjiModule.ts
 * @Description: 百度统计模块
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import IResult from "../IResult";
import config from "../config";
import { debugTool } from "../nativeInit";
import ToastModule from "../toast/ToastModule";


export default class BTongjiModule {
    private constructor() {
        //初始化
        uni.$anydoor_native.BTongji_Module && uni.$anydoor_native.BTongji_Module.init({
            appVersion: config.baidu_tongji().appVersion
        }, debugTool<IResult<undefined>>((res) => {
            if (res.success) {
                //取消掉debug
                uni.$anydoor_native.BTongji_Module.setAuthorizedState(debugTool(() => {
                    //允许获取mac地址
                    uni.$anydoor_native.BTongji_Module.setEnableMacId(true, debugTool())
                    //如果全局开启了debug
                    if (config.global.debug === true) uni.$anydoor_native.BTongji_Module.setDebug(true, debugTool())
                    //开始
                    uni.$anydoor_native.BTongji_Module.start(debugTool())
                }))
            } else {
                ToastModule.show({
                    text: '统计模块初始化失败!' + res.msg
                })
            }
        }))
    }
    //初始化
    static getInstance(): BTongjiModule {
        if (uni.$anydoor.BTongjiModule === undefined) {
            uni.$anydoor.BTongjiModule = new BTongjiModule()
        }
        return uni.$anydoor.BTongjiModule
    }
}