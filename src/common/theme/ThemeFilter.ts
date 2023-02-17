import { IThemeDataResult, IThemeDatabaseKeys } from "./IThemeDatabase";

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 20:14:44
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 20:27:09
 * @FilePath: \anydoor-v2\src\common\theme\ThemeFilter.ts
 * @Description: theme的filter
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default function ThemeFilter(data: any[]): IThemeDataResult {
    const res: IThemeDataResult = {
        [IThemeDatabaseKeys.FOLLOW_SYSTEM]: "",
        [IThemeDatabaseKeys.CURRENT_MODE]: ""
    }
    data.forEach((item) => {
        // @ts-ignore
        res[item.key] = item.value
    })
    return res
}