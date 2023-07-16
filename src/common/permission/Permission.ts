/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-04-09 11:25:49
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-16 20:05:04
 * @FilePath: \anydoor-v2\src\common\permission\Permission.ts
 * @Description: 权限管理模块
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import ToastModule from "../native/toast/ToastModule";
import { IPermissionItem, PERMISSIONS, PERMISSION_TYPE } from "./IPermission";

export default class Permission {
    static request(permissionItem: PERMISSION_TYPE, description?: string, title?: string) {
        const permission: IPermissionItem = PERMISSIONS[permissionItem]

        return new Promise((resolve: any, reject: any) => {
            plus.android.requestPermissions([permissionItem], (e: any) => {
                //显示出提示
                // ToastModule.show({ text: description || permission.description })
                if (e.deniedPresent.length > 0) {
                    // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启,用户临时拒绝
                    ToastModule.show({ text: permission.toast })
                    console.log('Present Denied!!! ' + e.deniedPresent.toString());
                    reject(e)
                }
                if (e.granted.length > 0) {
                    resolve()
                }
            }, function (e: any) {
                ToastModule.show({ text: "授权失败!" })
                reject(e)
            })
        })
    }
}



