/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 17:31:13
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-12 16:45:28
 * @FilePath: \anydoor-v2\src\common\database\database.ts
 * @Description: 数据库一些常量
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import ERROR_TARGET from "../errorHandler/ERROR_TARGET"
import ErrorHandler from "../errorHandler/ErrorHandler"
import DEVICE_TABLES from "./tables/device"
import LESSON_TABLES from "./tables/lesson"
import MPROGRAM_TABLES from "./tables/mprogram"
import SETTING_TABLES from "./tables/setting"
import USER_TABLES from "./tables/user"


//数据库名称
export enum DATA {
    //微应用
    MPROGRAM = "mprogram",
    //课程数据
    LESSON = "lesson",
    //设置数据
    SETTTING = "setting",
    //设备数据
    DEVICE = "device",
    //用户部分
    USER = "user"
}

let path: string = "_doc/"

if (uni.getSystemInfoSync().platform == "android") {
    try {
        const context = plus.android.runtimeMainActivity()
        let t = plus.android.invoke(context, "getDataDir")
        let p = plus.android.invoke(t, "getAbsolutePath")
        //适配低版本安卓，使用getFilesDir
        if (t === null) {
            t = plus.android.invoke(context, "getFilesDir")
            p = plus.android.invoke(t, "getAbsolutePath")
            //split
            p = p.split("/")
            p = p.slice(0, p.length - 1).join("/")
        }
        const newP: string = p + "/databases/anydoor/"
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
    },
    [DATA.DEVICE]: {
        path: path + DATA.DEVICE + '.db',
        tables: DEVICE_TABLES
    },
    [DATA.USER]: {
        path: path + DATA.USER + '.db',
        tables: USER_TABLES
    }
}

export default databases