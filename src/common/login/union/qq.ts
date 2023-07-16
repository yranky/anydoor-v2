import ToastModule from "@/common/native/toast/ToastModule"
import { union_login } from "@/common/service/login"
import { linkBack } from "@/common/utils/link"

export default async function () {
    return await qq()
}


export function qq() {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'qq',
            success: async function (loginRes) {
                uni.showLoading()
                await union_login({ type: "qq", token: (loginRes.authResult as any).access_token })
                linkBack()
                uni.hideLoading()
                resolve(loginRes)
            },
            fail: function (err: any) {
                console.log(err)
                ToastModule.show({
                    text: err.errMsg
                })
                reject(err)
            }
        })
    })
}