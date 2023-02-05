/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 17:31:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-05 16:32:42
 * @FilePath: \anydoor-v2\src\common\database\database.ts
 * @Description: 数据库一些常量
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import MPROGRAM_TABLES from "./tables/mprogram"


//数据库名称
export enum DATA {
    //微应用
    MPROGRAM = "mprogram"
}

export const databases = {
    [DATA.MPROGRAM]: {
        path: '_doc/' + DATA.MPROGRAM + '.db',
        //表格
        tables: MPROGRAM_TABLES
    }
}

export default databases