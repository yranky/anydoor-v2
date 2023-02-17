import nativeInit from "./common/native/nativeInit";
import Theme from "./common/theme/Theme";

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 15:18:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 22:21:50
 * @FilePath: \anydoor-v2\src\init.ts
 * @Description: 初始化
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default async function init() {
    //初始化原生插件
    nativeInit()
    //主题部分
    const ThemeInstance = await Theme.getInstance()
    ThemeInstance.getThemeData().then(res => {
        console.log(res)
    })
}