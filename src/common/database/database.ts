/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 17:31:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-15 17:37:14
 * @FilePath: \anydoor-v2\src\common\database\database.ts
 * @Description: 数据库一些常量
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import ERROR_TARGET from "../errorHandler/ERROR_TARGET"
import ErrorHandler from "../errorHandler/ErrorHandler"
import LESSON_TABLES from "./tables/lesson"
import MPROGRAM_TABLES from "./tables/mprogram"
import SETTING_TABLES from "./tables/setting"


//数据库名称
export enum DATA {
    //微应用
    MPROGRAM = "mprogram",
    //课程数据
    LESSON = "lesson",
    //设置数据
    SETTTING = "setting"
}

let path: string = "_doc/"

if (uni.getSystemInfoSync().platform == "android") {
    try {
        const context = plus.android.runtimeMainActivity()
        const t = plus.android.invoke(context, "getFilesDir")
        const p = plus.android.invoke(t, "getAbsolutePath")
        const newP: string = p + "/db_storage/"
        if (p !== null) {

            //创建目录
            const fileContext = plus.android.newObject("java.io.File", newP)
            const isExist = plus.android.invoke(fileContext, "exists")
            //如果不存在则先创建
            if (!isExist) {
                plus.android.invoke(fileContext, "mkdirs")
                plus.android.invoke(fileContext, "exists")
            }
            //赋值过去
            path = newP
        }
    } catch (e) {
        ErrorHandler.push(ERROR_TARGET.DATEBASE_FILES, JSON.stringify(e))
    }
}


export const databases = {
    [DATA.MPROGRAM]: {
        path: path + DATA.MPROGRAM + '.db',
        //表格
        tables: MPROGRAM_TABLES
    },
    [DATA.LESSON]: {
        path: path + DATA.LESSON + '.db',
        tables: LESSON_TABLES
    },
    [DATA.SETTTING]: {
        path: path + DATA.SETTTING + '.db',
        tables: SETTING_TABLES
    }
}

export default databases