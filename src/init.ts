import Device from "./common/database/device/Device"
import User from "./common/database/user/User"
import nativeInit from "./common/native/nativeInit"
import Theme from "./common/theme/Theme"
import useJiaowuStore from "@/store/jiaowu"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 15:18:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-05 11:41:03
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

//初始化用户信息等
export async function initUser() {
    //初始化用户
    const jiaowuAccount = await (await User.getInstance()).getJiaowuAccount(true)
    // 加载store
    const store = useJiaowuStore()
    //如果是false，则说明未登录
    if (jiaowuAccount !== false) {
        //教务密码
        store.$patch(state => {
            state.jiaowuAccount.username = jiaowuAccount.username
            state.jiaowuAccount.password = jiaowuAccount.password
            state.isLogin = true
        })
        //教务配置
        store.setJiaowuConfig(jiaowuAccount)
    } else {
        store.reset()
    }

}