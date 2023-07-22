/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-01 15:01:59
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-22 16:03:16
 * @FilePath: \anydoor-v2\src\common\native\download\IDownloadModule.ts
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


export default interface IDownloadModsuleNative {
    register(callbackfn?: (result: IResult<undefined>) => void): void
    registerSync(): IResult<undefined>

    create(option: IDownloadCreateOption, callbackfn?: (result: IResult<IDownloadCreateResult>) => void): void

    getDetail(taskId: number, callbackfn?: (result: IResult<IDownloadInfo>) => void): void
    getDetailSync(taskId: number): IResult<IDownloadInfo>

    getTaskList(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getTaskListSync(): IResult<Array<IDownloadInfo>>

    getAllNotCompleteTask(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getAllNotCompleteTaskSync(): IResult<Array<IDownloadInfo>>

    getAllCompleteTask(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getAllCompleteTaskSync(): IResult<Array<IDownloadInfo>>

    getDRunningTask(callbackfn?: (result: IResult<Array<IDownloadInfo>>) => void): void
    getDRunningTaskSync(): IResult<Array<IDownloadInfo>>

    stopAllTask(callbackfn?: (result: IResult<Array<undefined>>) => void): void
    stopAllTaskSync(): IResult<Array<undefined>>

    resumeAllTask(callbackfn?: (result: IResult<undefined>) => void): void
    resumeAllTaskSync(): IResult<undefined>

    removeAllTask(del: boolean, callbackfn?: (result: IResult<undefined>) => void): void
    removeAllTaskSync(del: boolean): IResult<undefined>

    getTaskState(taskId: number, callbackfn?: (result: IResult<IDownloadTaskStateResult>) => void): void
    getTaskStateSync(taskId: number): IResult<IDownloadTaskStateResult>

    cancel(data: IDownloadCancelOption, callbackfn?: (result: IResult<undefined>) => void): void
    cancelSync(data: IDownloadCancelOption): IResult<undefined>

    resetState(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void
    resetStateSync(taskId: number): IResult<undefined>

    stop(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void
    stopSync(taskId: number): IResult<undefined>

    resume(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void
    resumeSync(taskId: number): IResult<undefined>

    taskExists(taskId: number, callbackfn?: (result: IResult<IDownloadTaskExistseResult>) => void): void
    taskExistsSync(taskId: number): IResult<IDownloadTaskExistseResult>

    setMaxTaskNum(max: number, callbackfn?: (result: IResult<undefined>) => void): void
    setMaxTaskNumSync(max: number): IResult<undefined>

    removeRecord(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void
    removeRecordSync(taskId: number): IResult<undefined>

    listen(callbackfn?: (result: IResult<IDownloadListenResult>) => void): void

    unListen(uuid: String, callbackfn?: (result: IResult<undefined>) => void): void
    unListenSync(uuid: String): IResult<undefined>
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

export const TASK_STATE_NAME: IName<TASK_STATE> = {
    [TASK_STATE.UNKNOWN]: "未知",
    [TASK_STATE.FAIL]: "任务失败",
    [TASK_STATE.SUCCESS]: "已完成",
    [TASK_STATE.STOP]: "已停止",
    [TASK_STATE.WAITING]: "等待中",
    [TASK_STATE.RUNNING]: "下载中",
    [TASK_STATE.PRE_RUNNING]: "即将开始",
    [TASK_STATE.PRE_RUNNED]: "等待开始",
    [TASK_STATE.DELETE]: "已删除"
}

export type IName<T extends string | number | symbol> = {
    [key in T]: string
}