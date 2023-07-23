import useDeviceStore from "@/store/device"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-03 10:06:20
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-23 10:21:22
 * @FilePath: \anydoor-v2\src\common\native\config.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default {
    global: {
        debug: false
    },
    bugly: () => {
        const deviceStore = useDeviceStore()
        return {
            deviceId: deviceStore.deviceId,
            appVersion: getApp().globalData ? getApp().globalData!['versionName'] : plus.runtime.version,
            deviceModel: uni.getSystemInfoSync().deviceModel
        }
    },
    toast: {

    },
    baidu_tongji: () => {
        return {
            appVersion: getApp().globalData ? getApp().globalData!['versionName'] : plus.runtime.version,
        }
    },
    download: {

    }
}