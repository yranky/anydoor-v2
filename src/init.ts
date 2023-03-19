import Device from "./common/database/device/Device"
import User from "./common/database/user/User"
import nativeInit from "./common/native/nativeInit"
import Theme from "./common/theme/Theme"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 15:18:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-12 18:58:58
 * @FilePath: \anydoor-v2\src\init.ts
 * @Description: 初始化
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default async function init() {
    //初始化uni
    uni.$anydoor = {}

    //初始化原生插件
    nativeInit()

    //初始化device_id
    await (await Device.getInstance()).initDeviceId()

    //初始化用户
    const UserModule = await User.getInstance()
    await UserModule.initDataTable()

    //主题部分
    const ThemeInstance = await Theme.getInstance()
}