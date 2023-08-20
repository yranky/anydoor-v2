/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-20 15:50:28
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-08-12 20:07:27
 * @FilePath: \anydoor-v2\src\common\database\mprogram\MProgram.ts
 * @Description: 微应用(单例模式)
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

import ToastModule from "@/common/native/toast/ToastModule"
import SQLite from "../../sql/SQLite"
import databases, { DATA } from "../database"
import { MPROGRAM_TABLES_NAME } from "../tables/mprogram"
import { TOAST_POSITION } from "@/common/native/toast/IToastModule"
import { UNI_STORAGE } from "../UNI_STORAGE"
import { itemMprogram } from "@/common/service/mprogram"
import dayjs from "dayjs"


export default class MProgram {
    //最大的重试次数
    private static MAX_TIMES = 5
    //重试的次数
    private times = 0
    //sqlite对象
    private sql: SQLite | undefined

    //获取实例对象
    static async getInstance() {
        if (uni.$anydoor.MProgram === undefined) {
            uni.$anydoor.MProgram = new MProgram()
            //初始化sql
            uni.$anydoor.MProgram.sql = new SQLite(DATA.MPROGRAM)
            //等待创建完成
            await uni.$anydoor.MProgram.initDataTable()
        }
        return uni.$anydoor.MProgram
    }

    //构造函数
    private constructor() {
        //如果没有就重新加载
        if (!uni.$anydoor_native.MP) this.reloadMP()
    }

    //打开微应用
    async open(mpid: string | number, extraData: any = {}) {
        uni.$anydoor_native.Dialog_Module.showWaitingDialogSync({ title: '加载中...' })
        try {
            //先判断有没有安装
            let item: IMProgramItem = this.getInstalledItem(mpid)
            //请求获取应用接口
            let requestData: any = { data: {} }
            try {
                requestData = await itemMprogram({
                    id: mpid
                })
            } catch { }
            //调试模式，每次都自动下载
            if (!extraData.debug) {
                //如果版本不需要更新或者不是强制更新
                if (item.mp_vid === requestData.data.mp_vid || !requestData.data.force) {
                    //如果有id，先打开
                    if (item && item.unid) {
                        const startResult = await this.start(item.unid, {
                            ...item,
                            extraData: {
                                enableBackground: false,
                                //传递过去的数据
                                ...extraData
                            }
                        })
                        //说明要重新安装
                        if (startResult.code === MPROGRAM_STATUS_CODE.ERROR) {
                            //更新信息
                            item = this.getInstalledItem(mpid)
                        } else if (startResult.code === MPROGRAM_STATUS_CODE.FAIL) {
                            //提示错误
                            ToastModule.show({ text: startResult.msg || `未知错误!(code:${startResult.code})` })
                            uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
                        }
                    }
                }
                //请求的数据,先判断是否版本相同
                if (item.mp_vid === requestData.data.mp_vid) {
                    //那就不需要更新,更新数据后直接结束流程
                    this.updateInfo({
                        ...item,
                        extraData: {
                            enableBackground: requestData.data.enable_background == 1 ? true : false
                        },
                        update_time: dayjs().format("YYYY-MM-DD HH:mm:ss")
                    })
                    uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
                    return
                }
            }
            if (!requestData.data.download_link) {
                ToastModule.show({
                    text: '无法加载此微应用:not found'
                })
                uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
                return
            }
            //需要更新,后台自动下载更新
            const downloadData: any = await this.downloadMProgram(requestData.data.download_link)

            if (downloadData.statusCode !== 200) {
                ToastModule.show({
                    text: '下载/更新微应用时发生错误!'
                })
                uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
                return
            }
            const installApp = await this.install(requestData.data.unid, plus.io.convertLocalFileSystemURL(plus.io.convertAbsoluteFileSystem(downloadData.tempFilePath)))
            //打开
            if (installApp.code === MPROGRAM_STATUS_CODE.FAIL) {
                ToastModule.show({
                    text: installApp.msg
                })
            }
            const startData = await this.start(requestData.data.unid, {
                //后台运行
                extraData: {
                    enableBackground: requestData.data.enable_background == 1 ? true : false,
                    //传递过去的数据
                    ...extraData
                }
            })
            if (startData.code === MPROGRAM_STATUS_CODE.FAIL) {
                ToastModule.show({
                    text: startData.msg
                })
            }
            //保存到storage
            this.updateInfo({
                mpid: requestData.data.mpid,
                unid: requestData.data.unid,
                name: requestData.data.name,
                icon: requestData.data.icon,
                wgt: requestData.data.download_link,
                create_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                update_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                extraData: {
                    enableBackground: requestData.data.enable_background == 1 ? true : false,
                },
                mp_vid: requestData.data.mp_vid,
                ext: {}
            })
            uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
        } catch (e) {
            uni.$anydoor_native.Dialog_Module.hideWaitingDialogSync({})
        }
    }

    /**
     * 
     * @param item 更新信息
     */
    updateInfo(item: IMProgramItem) {
        let installed: IMProgramItem[] = uni.getStorageSync(UNI_STORAGE.UNI_MPROGRAM_INSTALLED) || []
        for (let i = 0; i < installed.length; i++) {
            if (installed[i].mpid === item.mpid) {
                installed.splice(i, 1)
                break
            }
        }
        installed.push(item)
        uni.setStorageSync(UNI_STORAGE.UNI_MPROGRAM_INSTALLED, installed)
    }

    //下载微应用
    async downloadMProgram(url: string) {
        uni.$anydoor_native.Dialog_Module.showWaitingDialogSync({ title: '资源加载中...' })
        return new Promise((resolve: any, reject: any) => {
            const downloadTask = uni.downloadFile({
                url: url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res)
                    } else {
                        ToastModule.show({ text: '微应用加载失败!' })
                        reject()
                    }
                },
                fail: () => {
                    ToastModule.show({ text: '微应用下载失败!' })
                    reject()
                }
            })

            downloadTask.onProgressUpdate((res) => {
                uni.$anydoor_native.Dialog_Module.setWaitingDialogInfoSync({ title: '资源加载中...', percent: res.progress })
                console.log('下载进度' + res.progress);
                console.log('已经下载的数据长度' + res.totalBytesWritten);
                console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
            });
            // downloadTask.abort(); 
        })

    }

    /**
     * 获取已安装的
     */
    getInstalledItem(mpid: string | number): IMProgramItem {
        let installed: IMProgramItem[] = uni.getStorageSync(UNI_STORAGE.UNI_MPROGRAM_INSTALLED) || []
        try {
            for (let i = 0; i < installed.length; i++) {
                if (installed[i].mpid == mpid) {
                    return installed[i]
                }
            }
        } catch (e) {
            console.log(e)
        }
        return {
            unid: "",
            name: "",
            icon: "",
            wgt: "",
            mpid: "",
            create_time: "",
            update_time: "",
            mp_vid: "",
            ext: "",
            extraData: {}
        }
    }

    //从数据库删除
    removeInstalledItem(mpid: string | number) {
        let installed: IMProgramItem[] = uni.getStorageSync(UNI_STORAGE.UNI_MPROGRAM_INSTALLED) || []
        try {
            installed = installed.filter(item => item.mpid != mpid)
            uni.setStorageSync(UNI_STORAGE.UNI_MPROGRAM_INSTALLED, installed)
        } catch (e) {
            console.log(e)
        }
        return {}
    }

    //启动应用
    start(appid: string, option: IMProgramItem = {}): Promise<IMProgramStatusResult> {
        return new Promise((resolve) => {
            uni.$anydoor_native.MP.openUniMP({
                appid,
                // ...option,
                extraData: {
                    enableBackground: false
                }
            }, (e: any) => {
                //如果是未安装的问题
                if (e.code === -1001) {
                    this.removeInstalledItem(option.mpid || "")
                    resolve({
                        code: MPROGRAM_STATUS_CODE.ERROR,
                        msg: '请重试!'
                    })
                }
                //另外一条
                if (e.code !== 0) {
                    resolve({
                        code: MPROGRAM_STATUS_CODE.FAIL,
                        msg: e.msg,
                        error: e
                    })
                } else {
                    resolve({
                        code: MPROGRAM_STATUS_CODE.SUCCESS
                    })
                }
            })
        })
    }

    //安装应用
    install(appid: string, path: string, password?: string): Promise<IMProgramStatusResult> {
        return new Promise((resolve) => {
            uni.$anydoor_native.MP.installUniMP({
                appid: appid,
                wgtFile: path,
                password
            }, (res: any) => {
                if (res.code === 0) {
                    resolve({
                        code: MPROGRAM_STATUS_CODE.SUCCESS
                    })
                } else {
                    resolve({
                        code: MPROGRAM_STATUS_CODE.FAIL,
                        msg: res
                    })
                }
            })
        })
    }

    //重新加载 小程序模块
    reloadMP() {
        this.times++
        if (!uni.$anydoor_native.MP) {
            ToastModule.show({
                text: "模块加载失败，请尝试应用升级版本,重试:" + this.times,
                position: TOAST_POSITION.CENTER
            })
            if (this.times <= MProgram.MAX_TIMES) this.reloadMP()
            else this.times = 0;
        }
        uni.$anydoor_native.MP = uni.requireNativePlugin('uniMP')
    }

    //初始化小程序表
    async initDataTable() {
        return await this.sql!.executeSql([databases[DATA.MPROGRAM].tables[MPROGRAM_TABLES_NAME.PROGRAM].init])
    }

    //获取小程序列表
    async getAppList() {
        return await this.sql!.selectSql("select * from " + MPROGRAM_TABLES_NAME.PROGRAM)
    }
}


export enum MPROGRAM_STATUS_CODE {
    SUCCESS = 200,
    FAIL = 1,
    ERROR = 2
}

export interface IMProgramStatusResult {
    code: MPROGRAM_STATUS_CODE,
    msg?: any,
    error?: any
}

export enum MPROGRAM_SCENE {
    DEFAULT = "default"
}


export interface IMProgramItem {
    mpid?: string | number,
    unid?: string,
    name?: string,
    icon?: string,
    wgt?: string,
    create_time?: string,
    update_time?: string,
    mp_vid?: string | number,
    ext?: any,
    extraData?: IMProgramOpenOption
}
export interface IMProgramOpenOption {
    //打开的图标
    icon?: string
    //extradata,额外的数据
    extradata?: any
    //来源的appid
    fromAppid?: string
    //场景
    scene?: MPROGRAM_SCENE
    //启动小程序的动画方式（IOS）
    openMode?: "present" | "push"
    //是否开启手势关闭小程序（IOS）
    enableGestureClose?: boolean
    //是否开启打开小程序时的动画（IOS）
    enableShowAnimated?: boolean
    //是否开启关闭小程序时的动画（IOS）
    enableHideAnimated?: boolean
    //是否开启小程序后台运行能力
    enableBackground?: boolean
}
