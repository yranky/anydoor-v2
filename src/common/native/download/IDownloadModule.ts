/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-01 15:01:59
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-03 10:50:22
 * @FilePath: \测试2\common\native\download\IDownloadModule.ts
 * @Description: 原生的接口定义
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import IResult from "../IResult"

//创建下载接口
export interface IDownloadCreateOption {
    url: string
    mode: DOWNLOAD_PATH_MODE
    path?: string
    highestPriority?: boolean
    ignoreFilePathOccupy?: boolean
    ignorePermissionsCheck?: boolean,
    //文件名
    filename?: string
}

export interface IDownloadCreateResult { taskId?: number }
export interface IDownloadTaskStateResult { state: TASK_STATE, taskId: number }
export interface IDownloadCancelOption { removeFile: boolean, taskId: number }
export interface IDownloadTaskExistseResult { exist: boolean }
export interface IDownloadListenResult { uuid?: String, data?: Array<IDownloadInfo>, current: IDownloadInfo, currentUrlTasks?: Array<IDownloadInfo> }


export default interface IDownloadModuleNative {
    register(callbackfn?: (result: IResult<undefined>) => void): void
    create(option: IDownloadCreateOption, callbackfn?: (result: IResult<IDownloadCreateResult>) => void): void
    getDetail(taskId: number, callbackfn?: (result: IResult<IDownloadInfo>) => void): void
    getTaskList(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getAllNotCompleteTask(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getAllCompleteTask(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getDRunningTask(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    stopAllTask(callbackfn?: (result: IResult<Array<undefined>>) => void): void
    resumeAllTask(callbackfn?: (result: IResult<undefined>) => void): void
    removeAllTask(del: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    getTaskState(taskId: number, callbackfn?: (result: IResult<IDownloadTaskStateResult>) => void): void
    cancel(data: IDownloadCancelOption, callbackfn?: (result: IResult<undefined>) => void): void
    resetState(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void
    taskExists(taskId: number, callbackfn?: (result: IResult<IDownloadTaskExistseResult>) => void): void
    setMaxTaskNum(max: number, callbackfn?: (result: IResult<undefined>) => void): void
    removeRecord(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void
    listen(callbackfn?: (result: IResult<IDownloadListenResult>) => void): void
    unListen(uuid: String, callbackfn?: (result: IResult<undefined>) => void): void
}

//下载路径类型
export enum DOWNLOAD_PATH_MODE {
    FILE_DIR = 1,
    //data/data/packagename/cache
    CACHE_DIR = 2,
    //android/data/packagename/cache
    EXTERNAL_CACHE_DIR = 3,
    //android/data/packagename/files
    EXTERNAL_FILE_DIR = 4,
    //storage/emulated/0
    EXTERNAL_STORAGE_DIR = 5,
    //共享文件夹
    EXTERNAL_STORAGE_PUBLIC_DIR = 6,
    //自定义
    DIY = 7
}

export interface IDownloadInfo {
    speed: number
    convertSpeed: string
    fileSize: number
    convertFileSize: string
    state: DOWNLOAD_STATE
    currentProgress: number
    completeTime: number
    percent: number
    isComplete: boolean
    url: string
    fileName: string
    isGroupChild: Boolean
    redirectUrl: string | null
    isRedirect: boolean
    filePath: string
    groupHash: string
    md5Code: string
    disposition: string
    serverFileName: string
    taskId: number
}

export enum DOWNLOAD_STATE {
    FAIL = 0,
    COMPLETE = 1,
    STOP = 2,
    WAITING = 3
}

export enum TASK_STATE {
    UNKNOWN = -1,
    FAIL = 0,
    SUCCESS = 1,
    STOP = 2,
    WAITING = 3,
    RUNNING = 4,
    PRE_RUNNING = 5,
    PRE_RUNNED = 6,
    DELETE = 7
}