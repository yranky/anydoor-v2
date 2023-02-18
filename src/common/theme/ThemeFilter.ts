import { ValueType } from "../database/tools";
import { IThemeDataResult, IThemeDatabaseKeys, ThemeDefaultVal } from "./IThemeDatabase";

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 20:14:44
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 23:07:18
 * @FilePath: \anydoor-v2\src\common\theme\ThemeFilter.ts
 * @Description: theme的filter
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default function ThemeFilter(data: any[]) {
    const val: any = {}
    data.map((item) => {
        let value: any = item.value
        let key: string = item.key
        // @ts-ignore
        const type = ThemeDefaultVal[item.key] ? ThemeDefaultVal[item.key].type : ValueType.STRING
        switch (type) {
            case ValueType.BOOLEAN: {
                if (value === '1') value = true
                else value = false
                break
            }
            case ValueType.STRING: {
                break
            }
            default: break
        }
        val[key] = value
    })
    return val
}