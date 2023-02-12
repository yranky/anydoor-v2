/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-05 16:23:46
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-12 22:04:22
 * @FilePath: \anydoor-v2\src\common\database\tables\mprogram.ts
 * @Description: 小程序
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { ITables } from "../IDatabase"

export enum MPROGRAM_TABLES_NAME {
    //安装的小程序等
    PROGRAM = "mprogram_program"
}

const MPROGRAM_TABLES: ITables<MPROGRAM_TABLES_NAME> = {
    //安装的小程序等
    [MPROGRAM_TABLES_NAME.PROGRAM]: {
        init: `
        CREATE TABLE if not exists ${MPROGRAM_TABLES_NAME.PROGRAM} ( 
            'appid' text NOT NULL , 
            'name' text NOT NULL , 
            'icon' text NOT NULL , 
            'wgt' text NOT NULL , 
            'create_time' INTEGER NOT NULL , 
            'update_time' INTEGER NOT NULL , 
            'password' text NOT NULL , 
            'enableBackground' INTEGER NOT NULL DEFAULT '0',
            'ext' text,
             PRIMARY KEY ('appid')
             );`
    }
}

export default MPROGRAM_TABLES