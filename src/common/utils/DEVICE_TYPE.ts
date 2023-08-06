/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-08-06 10:20:34
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-08-06 11:42:36
 * @FilePath: \anydoor-v2\src\common\utils\DEVICE_TYPE.ts
 * @Description: 设备类型
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

export enum DEVICE_TYPE {
    // 安卓APP
    ANDROID_APP = 1,

    // IOS APP
    IOS_APP = 2,

    // 微信小程序
    WEIXIN_MP = 3
}

//获取设备类型
export function getDeviceType(): DEVICE_TYPE {
    if (uni.getSystemInfoSync().uniPlatform === "app") {
        //安卓app
        if (uni.getSystemInfoSync().osName === 'android') {
            return DEVICE_TYPE.ANDROID_APP
            //ios app
        } else if (uni.getSystemInfoSync().osName === 'ios') {
            return DEVICE_TYPE.IOS_APP
        }
        //微信小程序
    } else if (uni.getSystemInfoSync().uniPlatform === "mp-weixin") {
        return DEVICE_TYPE.WEIXIN_MP
    }
    return DEVICE_TYPE.ANDROID_APP
}



export default DEVICE_TYPE