import { MPROGRAM_PROGRAM } from "../../mprogram/tables"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 17:31:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-01-20 22:52:20
 * @FilePath: \anydoor-v2\src\common\sql\sqlite\database.ts
 * @Description: 数据库一些常量
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export enum DATA {
    MPROGRAM = "mprogram"
}

export const databases = {
    [DATA.MPROGRAM]: {
        path: '_doc/' + DATA.MPROGRAM + '.db',
        //表格
        tables: {
            [MPROGRAM_PROGRAM.PROGRAM]: {
                init: "CREATE TABLE if not exists " + MPROGRAM_PROGRAM.PROGRAM + " ( `appid` VARCHAR(200) NOT NULL , `name` VARCHAR(200) NOT NULL , `icon` VARCHAR(300) NOT NULL , `wgt` VARCHAR(500) NOT NULL , `create_time` DATETIME NOT NULL , `update_time` DATETIME NOT NULL , `password` VARCHAR(500) NOT NULL , `enableBackground` TINYINT(1) NOT NULL DEFAULT '0' , PRIMARY KEY (`appid`));"
            }
        }

    }
}

export default databases