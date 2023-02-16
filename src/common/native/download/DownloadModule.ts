import IDownloadModuleNative, { DOWNLOAD_PATH_MODE, IDownloadInfo } from "./IDownloadModule"
import ToastModule from "../toast/ToastModule"
import IResult from "../IResult"
import { debugTool } from "../nativeInit"

export interface IDownloadTask extends IDownloadInfo {

}

export default class DownloadModule {
    // @ts-ignore
    private static MODULE: IDownloadModuleNative = uni.requireNativePlugin("anydoor_download")
    //监听
    private static instance: DownloadModule | null = null

    //订阅者
    private static suscriber: Array<Function> = []

    //任务列表
    private static tasks: Array<IDownloadTask> = []

    //原生的监听者
    private static nativeListeners: String[] = []


    private constructor() { }

    static getInstance(): DownloadModule {
        if (DownloadModule.instance === null) {
            DownloadModule.instance = new DownloadModule()
            //初始化
            DownloadModule.MODULE && DownloadModule.MODULE.register(debugTool(res => {
                ToastModule.show({
                    text: "初始化成功!"
                })
                //获取任务列表,
                DownloadModule.MODULE.getTaskList(debugTool((res) => {
                    res.data?.forEach((item) => {
                        DownloadModule.tasks.push(item)
                    })
                    console.log(DownloadModule.tasks)
                }))
                //创建监听器
                DownloadModule.MODULE.listen(debugTool((res) => {
                    DownloadModule.listenCallBack(res)
                }))

            }))
        }
        return DownloadModule.instance
    }

    create(url: string): void {
        DownloadModule.MODULE && DownloadModule.MODULE.create({
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
                res.data?.taskId && DownloadModule.MODULE.getDetail(res.data?.taskId, (result: IResult<IDownloadInfo>) => {
                    result.data && DownloadModule.tasks.push(result.data)
                })
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
            DownloadModule.suscriber.forEach((item) => {
                //需要深复制
                const tasks = JSON.parse(JSON.stringify(DownloadModule.tasks))
                typeof item === 'function' && item.call(this, tasks)
            })
        }
    }
}