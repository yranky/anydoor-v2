/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-05 16:34:08
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-05 17:00:06
 * @FilePath: \anydoor-v2\src\common\database\IDatabase.ts
 * @Description: 表定义
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

export type ITables<T extends string | number | symbol> = {
    [key in T]: {
        init: string,
        drop?: string
    }
}