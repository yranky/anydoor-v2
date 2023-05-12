import ToastModule from "@/common/native/toast/ToastModule"

export default async function () {
    return await weibo()
}


export function weibo() {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'sinaweibo',
            success: function (loginRes) {
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