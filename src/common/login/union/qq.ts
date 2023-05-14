import ToastModule from "@/common/native/toast/ToastModule"

export default async function () {
    return await qq()
}


export function qq() {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'qq',
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