/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 20:39:34
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-17 22:52:07
 * @FilePath: \anydoor-v2\src\common\database\tools.ts
 * @Description: 工具
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

//插入 key,value类型数据的初始化语句生成
export function insertKeyAndValueDefault(tableName: string, defaultVals: { [key: string]: any }) {
    return Object.keys(defaultVals).map(item => {
        return `
        insert or ignore into ${tableName} (key,value) values ('${item}','${defaultVals[item].default}')
        `
    })
}

//value类型
export enum ValueType {
    BOOLEAN = "boolean",
    STRING = "string"
}