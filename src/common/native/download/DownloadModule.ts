import IDownloadModuleNative, { DOWNLOAD_PATH_MODE, IDownloadCancelOption, IDownloadInfo } from "./IDownloadModule"
import ToastModule from "../toast/ToastModule"
import IResult from "../IResult"
import { debugTool } from "../nativeInit"
import Permission from "@/common/permission/Permission"
import { PERMISSION_TYPE } from "@/common/permission/IPermission"

export interface IDownloadTask extends IDownloadInfo {

}

export default class DownloadModule {

    //订阅者
    private static suscriber: Array<Function> = []

    //任务列表
    private static tasks: Array<IDownloadTask> = []

    //原生的监听者
    private static nativeListeners: String[] = []

    //自动打开的任务id
    private static autoOpenList: number[] = []


    private constructor() { }

    static getInstance(): DownloadModule {
        if (uni.$anydoor.DownloadModule === undefined) {
            uni.$anydoor.DownloadModule = new DownloadModule()
            //初始化
            uni.$anydoor_native.Download_Module && uni.$anydoor_native.Download_Module.register(debugTool(res => {
                //获取任务列表,
                uni.$anydoor_native.Download_Module.getTaskList(debugTool((res) => {
                    res.data?.forEach((item) => {
                        DownloadModule.tasks.push(item)
                    })
                }))
                //创建监听器
                uni.$anydoor_native.Download_Module.listen(debugTool((res) => {
                    DownloadModule.listenCallBack(res)
                }))

            }))
        }
        return uni.$anydoor.DownloadModule
    }

    //取消
    cancel(data: IDownloadCancelOption, callbackfn?: (result: IResult<undefined>) => void): void {
        //TODO 
        Permission.request(PERMISSION_TYPE.WRITE_EXTERNAL_STORAGE).then(() => {
            uni.$anydoor_native.Download_Module.cancel(data, (result: IResult<undefined>) => {
                setTimeout(() => {
                    this.getTaskList((res) => {
                        callbackfn && callbackfn(result)
                    })
                }, 100)
            })
        })
    }
    //删除记录
    removeRecord(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void {
        uni.$anydoor_native.Download_Module.removeRecord(taskId, (result: IResult<undefined>) => {
            this.getTaskList((res) => {
                callbackfn && callbackfn(result)
            })
        })
    }

    //重新刷新任务
    resetState(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void {
        uni.$anydoor_native.Download_Module.resetState(taskId, (result: IResult<undefined>) => {
            this.getTaskList((res) => {
                callbackfn && callbackfn(result)
            })
        })
    }

    //重新刷新任务
    stop(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void {
        //TODO 
        Permission.request(PERMISSION_TYPE.WRITE_EXTERNAL_STORAGE).then(() => {
            uni.$anydoor_native.Download_Module.stop(taskId, (result: IResult<undefined>) => {

                setTimeout(() => {
                    this.getTaskList((res) => {
                        console.log(res)
                        callbackfn && callbackfn(result)
                    })
                }, 100)
            })
        })
    }

    //重新刷新任务
    resume(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void {
        //TODO 
        Permission.request(PERMISSION_TYPE.WRITE_EXTERNAL_STORAGE).then(() => {
            uni.$anydoor_native.Download_Module.resume(taskId, (result: IResult<undefined>) => {
                setTimeout(() => {
                    this.getTaskList((res) => {
                        console.log(res)
                        callbackfn && callbackfn(result)
                    })
                }, 100)
            })
        })
    }

    //获取任务列表
    getTaskList(callbackfn?: (result: Array<IDownloadTask>) => void) {
        uni.$anydoor_native.Download_Module.getTaskList(debugTool((res) => {
            DownloadModule.tasks.splice(0, DownloadModule.tasks.length)
            res.data?.forEach((item) => {
                DownloadModule.tasks.push(item)
            })
            callbackfn && callbackfn(DownloadModule.tasks)
            //回调
            DownloadModule.doCallback()
        }))
    }

    //创建一个下载任务
    /**
     * @param {string} url
     * @param {boolean} autoOpen 自动打开
     * @param {string} fileName 文件名,默认从服务器获取
     * @param {string} path 下载路径，默认为downloads
     * @param {DOWNLOAD_PATH_MODE} mode 文件夹类型，默认为安装包下的files目录
     */
    create(url: string, autoOpen?: boolean, fileName?: string, path: string = "downloads", mode: DOWNLOAD_PATH_MODE = DOWNLOAD_PATH_MODE.EXTERNAL_FILE_DIR): void {
        uni.$anydoor_native.Download_Module && uni.$anydoor_native.Download_Module.create({
            url,
            mode,
            filename: fileName,
            path,
            ignorePermissionsCheck: true
        }, debugTool(res => {
            if (res.success) {
                ToastModule.show({
                    text: "任务创建成功，请前往我的下载查看"
                })
                //如果是要自动打开的，加入自动打开的队列
                if (autoOpen) {
                    res.data?.taskId && DownloadModule.autoOpenList.push(res.data?.taskId);
                }
                //将新任务加入
                // res.data?.taskId && uni.$anydoor_native.Download_Module.getDetail(res.data?.taskId, (result: IResult<IDownloadInfo>) => {
                //     result.data && DownloadModule.tasks.push(result.data)
                // })
                //直接刷新整个队列
                this.getTaskList()
            }
        }))
    }
    //监听
    listen(fn: Function): void {
        DownloadModule.suscriber.push(fn)
    }
    //取消监听
    unListen(fn: Function): void {
        const index: number | undefined = DownloadModule.suscriber.findIndex((c) => c === fn)
        if (index !== undefined) DownloadModule.suscriber.splice(index, 1)
    }

    //执行回调
    private static doCallback() {
        DownloadModule.suscriber.forEach((item) => {
            //需要深复制
            const tasks = JSON.parse(JSON.stringify(DownloadModule.tasks))
            typeof item === 'function' && item.call(this, tasks)
        })
    }

    private static listenCallBack(res: IResult<{ uuid?: String, current: IDownloadInfo, data?: Array<IDownloadInfo>, currentUrlTasks?: Array<IDownloadInfo> }>) {
        // 如果有uuid,说明是事件刚注册
        if (res.data && res.data?.uuid) {
            DownloadModule.nativeListeners.push(res.data.uuid)
        } else if (res.data && res.data?.data && res.data.current && res.data.currentUrlTasks) {
            //如果有当前url的task 比较current
            res.data.currentUrlTasks.forEach((item) => {
                //说明是同一个任务
                if (item.fileName === res.data?.current.fileName &&
                    item.filePath === res.data.current.filePath) {
                    res.data.current.taskId = item.taskId
                }
            })
            //更新任务
            const currentTask: IDownloadTask | undefined = DownloadModule.tasks.find(item => item.taskId === res.data?.current.taskId)
            currentTask && function () {
                for (let key in res.data.current) {
                    //除了taskId,都重新赋值
                    if (key !== "taskId") {
                        // @ts-ignore 忽略
                        currentTask[key] = res.data.current[key]
                    }
                }
            }()
            //判断是否下载完成
            if (currentTask?.isComplete && DownloadModule.autoOpenList.includes(currentTask.taskId)) {
                const index = DownloadModule.autoOpenList.findIndex((item) => item === currentTask.taskId)
                DownloadModule.autoOpenList.splice(index, 1)
                //执行文件打开操作
                uni.openDocument({
                    filePath: currentTask.filePath,
                    fail: () => {
                        ToastModule.show({ text: "无法打开该已下载的文件:" + currentTask.fileName })
                    }
                });
            }
            //触发一些回调
            this.doCallback()
        }
    }
}