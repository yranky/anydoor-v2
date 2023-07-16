import { UNI_STORAGE } from "../database/UNI_STORAGE"
import ToastModule from "../native/toast/ToastModule"
import { updateCheck } from "../service/update"

export default class Update {
    private constructor() {
    }

    //获取实例对象
    static getInstance() {
        if (uni.$anydoor.Update === undefined) {
            uni.$anydoor.Update = new Update()
        }
        return uni.$anydoor.Update
    }

    //检查是否有更新
    check() {
        return new Promise((resolve, reject) => {
            //先请求接口，判断是否有更新
            updateCheck({}).then(res => {
                resolve(res)
                //如果没有更新
                if (res.update !== 1) return
                //如果是wgt包
                if (res.data.wgt === 1) {
                    this.doWgtUpdate(res.data.download_link, res.data.version_id, res.data.version_force)
                }
                //如果是普通安装包
                else {
                    uni.$anydoor_native.Dialog_Module.showUpdateDialog({
                        isWifiOnly: false,
                        downloadUrl: res.data.download_link,
                        log: res.data.detail,
                        versionCode: res.data.version_id,
                        versionName: res.data.version_name,
                        isIgnorable: res.data.version_force === 1 ? false : true
                    }, (dialogResult) => {
                        //如果点击确定，则执行升级操作
                        if (dialogResult.data?.type === "ok") this.doUpdate(res.data.download_link, res.data.version_id)
                    })
                }
            }).catch((e) => {
                reject(e)
            })
        })
    }

    //更新
    update() {
        this.check()
    }


    /**
     * @param {string} download_link 下载链接
     * @param {string|number} version_id 版本号
     * @return {*}
     * @description: 执行APP资源包升级操作
     */
    async doWgtUpdate(download_link: string, version_id: number | string, force: boolean) {
        //上面没有成功打开，进行下载
        this.down(download_link, true, false).then(downloadRes => {
            plus.runtime.install(downloadRes.savedFilePath, { force }, (res) => {
                console.log(res)
            }, (err) => {
                ToastModule.show({ text: '更新资源加载失败!' })
            })
        })
    }

    /**
     * @param {string} download_link 下载链接
     * @param {string|number} version_id 版本号
     * @return {*}
     * @description: 执行APP整包升级操作
     */
    async doUpdate(download_link: string, version_id: number | string) {
        //先判断缓存中是否有
        const item = uni.getStorageSync(UNI_STORAGE.UPDATE_INFO)
        if (item && item['version'] === version_id) {
            //有就直接打开
            try {
                await this.openPath(item['path'])
                //如果成功打开了，直接停止后面运行的
                return
            } catch { }
        }
        //上面没有成功打开，进行下载
        this.down(download_link).then(downloadRes => {
            uni.setStorageSync(UNI_STORAGE.UPDATE_INFO, {
                version: version_id,
                path: downloadRes.savedFilePath
            })
        })
    }

    //打开安装包
    openPath(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            uni.openDocument({
                filePath: path,
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    }

    //下载
    /**
     * @param {string} url 下载链接
     * @param {boolean} silent 静默下载
     * @param {boolean} open 下载后自动打开
     * @return {*}
     * @description: 下载更新文件
     */
    down(url: string, silent: boolean = false, open: boolean = true): Promise<UniApp.SaveFileSuccess> {
        return new Promise((resolve, reject) => {
            !silent && ToastModule.show({ text: '新版本下载已开始' })
            uni.downloadFile({
                url,
                success: (result: UniApp.DownloadSuccessData) => {
                    if (result.statusCode === 200) {
                        uni.saveFile({
                            tempFilePath: result.tempFilePath,
                            success: (saveResult: UniApp.SaveFileSuccess) => {
                                !silent && ToastModule.show({ text: '新版本下载完成' })
                                //打开
                                if (open) this.openPath(saveResult.savedFilePath).catch(err => {
                                    ToastModule.show({ text: '更新失败!打开安装包时错误:' + err })
                                })
                                //resolve
                                resolve(saveResult)
                            },
                            fail(err) {
                                ToastModule.show({ text: '更新失败!保存文件时错误:' + err })
                                reject(err)
                            }
                        })
                    }
                },
                fail(result) {
                    ToastModule.show({ text: '更新失败!下载时发生错误:' + result })
                    reject(result)
                }
            })
        })
    }
}