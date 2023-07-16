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
        //先请求接口，判断是否有更新
        updateCheck({}).then(res => {
            //如果是wgt包
            if (res.data.wgt === 1) {
                console.log('wgt')
            }
            //如果是普通安装包
            else {
                uni.$anydoor_native.Dialog_Module.showMessageDialog({
                    title: res.data.title,
                    okText: '下载',
                    cancelText: res.data.version_force === 1 ? undefined : '取消',
                    cancelable: res.data.version_force === 1 ? false : true,
                    content: res.data.version_name + '\n' + res.data.detail
                }, (dialogResult) => {
                    if (dialogResult.data?.type === 'ok') {
                    }
                })
            }
        })
    }

    //更新
    update() {
        this.check()
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
                                open && uni.openDocument({
                                    filePath: saveResult.savedFilePath,
                                    fail(err) {
                                        ToastModule.show({ text: '更新失败!打开安装包时发生错误:' + err })
                                        reject(err)
                                    }
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