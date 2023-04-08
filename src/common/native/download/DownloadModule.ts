import IDownloadModuleNative, { DOWNLOAD_PATH_MODE, IDownloadCancelOption, IDownloadInfo } from "./IDownloadModule"
import ToastModule from "../toast/ToastModule"
import IResult from "../IResult"
import { debugTool } from "../nativeInit"

export interface IDownloadTask extends IDownloadInfo {

}

export default class DownloadModule {

    //订阅者
    private static suscriber: Array<Function> = []

    //任务列表
    private static tasks: Array<IDownloadTask> = []

    //原生的监听者
    private static nativeListeners: String[] = []


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
        plus.android.requestPermissions(["android.permission.WRITE_EXTERNAL_STORAGE"], (e) => {
            if (e.deniedAlways.length > 0) {
                ToastModule.show({ text: "请开启SD卡读写权限" })
                // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
                console.log('Always Denied!!! ' + e.deniedAlways.toString());
            }
            if (e.deniedPresent.length > 0) {
                ToastModule.show({ text: "请开启SD卡读写权限" })

                console.log('Present Denied!!! ' + e.deniedPresent.toString());
            }
            if (e.granted.length > 0) {
                uni.$anydoor_native.Download_Module.cancel(data, (result: IResult<undefined>) => {
                    setTimeout(() => {
                        this.getTaskList((res) => {
                            console.log(res)
                            callbackfn && callbackfn(result)
                        })
                    }, 100)
                })
            }
        }, function (e) {
            ToastModule.show({ text: "授权失败!" })
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
        plus.android.requestPermissions(["android.permission.WRITE_EXTERNAL_STORAGE"], (e) => {
            if (e.deniedAlways.length > 0) {
                ToastModule.show({ text: "请开启SD卡读写权限" })
                // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
                console.log('Always Denied!!! ' + e.deniedAlways.toString());
            }
            if (e.deniedPresent.length > 0) {
                ToastModule.show({ text: "请开启SD卡读写权限" })

                console.log('Present Denied!!! ' + e.deniedPresent.toString());
            }
            if (e.granted.length > 0) {
                uni.$anydoor_native.Download_Module.stop(taskId, (result: IResult<undefined>) => {
                    
                    setTimeout(() => {
                        this.getTaskList((res) => {
                            console.log(res)
                            callbackfn && callbackfn(result)
                        })
                    }, 100)
                })
            }
        }, function (e) {
            ToastModule.show({ text: "授权失败!" })
        })
    }

    //重新刷新任务
    resume(taskId: number, callbackfn?: (result: IResult<undefined>) => void): void {
        //TODO 
        plus.android.requestPermissions(["android.permission.WRITE_EXTERNAL_STORAGE"], (e) => {
            if (e.deniedAlways.length > 0) {
                ToastModule.show({ text: "请开启SD卡读写权限" })
                // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
                console.log('Always Denied!!! ' + e.deniedAlways.toString());
            }
            if (e.deniedPresent.length > 0) {
                ToastModule.show({ text: "请开启SD卡读写权限" })

                console.log('Present Denied!!! ' + e.deniedPresent.toString());
            }
            if (e.granted.length > 0) {
                uni.$anydoor_native.Download_Module.resume(taskId, (result: IResult<undefined>) => {
                    
                    setTimeout(() => {
                        this.getTaskList((res) => {
                            console.log(res)
                            callbackfn && callbackfn(result)
                        })
                    }, 100)
                })
            }
        }, function (e) {
            ToastModule.show({ text: "授权失败!" })
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

    create(url: string): void {
        uni.$anydoor_native.Download_Module && uni.$anydoor_native.Download_Module.create({
            url: url,
            mode: DOWNLOAD_PATH_MODE.EXTERNAL_FILE_DIR,
            path: 'download',
            ignorePermissionsCheck: true
        }, debugTool(res => {
            if (res.success) {
                ToastModule.show({
                    text: "任务创建成功!"
                })
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
    //deboucne
    private static debounce(fn: Function, delay: number) {
        let time: any = null
        return () => {
            if (time !== null) {
                clearTimeout(time);
            }
            time = setTimeout(() => {
                fn.call(this);
            }, delay)
        }
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
        //如果有uuid,说明是事件刚注册
        if (res.data && res.data?.uuid) {
            DownloadModule.nativeListeners.push(res.data.uuid)
        } else if (res.data && res.data?.data && res.data.current && res.data.currentUrlTasks) {
            //如果有当前url的task
            //比较current
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
            //触发一些回调
            this.doCallback()
        }
    }
}