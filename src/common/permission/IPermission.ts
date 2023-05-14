/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-04-09 11:26:34
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-13 22:38:47
 * @FilePath: \anydoor-v2\src\common\permission\IPermission.ts
 * @Description: 权限定义模块
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */



export enum PERMISSION_TYPE{
    //读取设备外部存储空间 程序可以读取设备外部存储空间（内置SDcard和外置SDCard）的文件，如果您的App已经添加了“WRITE_EXTERNAL_STORAGE ”权限 ，则就没必要添加读的权限了，写权限已经包含了读权限了。
    READ_EXTERNAL_STORAGE="android.permission.READ_EXTERNAL_STORAGE",
    WRITE_EXTERNAL_STORAGE = "android.permission.WRITE_EXTERNAL_STORAGE",
    //读取相机的权限
    CAMERA="android.permission.CAMERA"
}


export const PERMISSIONS:IPermission<PERMISSION_TYPE>={
    [PERMISSION_TYPE.READ_EXTERNAL_STORAGE]: {
        description: '读取设备外部存储空间',
        title: '读取设备外部存储空间',
        toast: "请授权读取设备外部存储空间权限"
    },
    [PERMISSION_TYPE.WRITE_EXTERNAL_STORAGE]: {
        description: '该权限用于下载模块的读写操作',
        title: '读写设备外部存储空间',
        toast: "请授权读写设备外部存储空间权限"
    },
    [PERMISSION_TYPE.CAMERA]: {
        description: '该权限用于扫描二维码',
        title: '相机拍照',
        toast: "请授权拍照权限"
    }
}

export interface IPermissionItem{
    description:string,
    title:string,
    toast:string
}

export type IPermission<T extends string | number | symbol> = {
    [key in T]: IPermissionItem
}