import ToastModule from "@/common/native/toast/ToastModule"
import { union_login } from "@/common/service/login"
import { linkBack } from "@/common/utils/link"

export default async function () {
    return await weibo()
}


export function weibo() {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'sinaweibo',
            success: async function (loginRes) {
                uni.showLoading()
                await union_login({ type: "weibo", token: (loginRes.authResult as any).access_token, uid: (loginRes.authResult as any).uid })
                linkBack()
                uni.hideLoading()
                resolve(loginRes)
            },
            fail: function (err: any) {
                ToastModule.show({
                    text: err.errMsg
                })
                reject(err)
            }
        })
    })
}