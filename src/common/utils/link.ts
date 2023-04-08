import qs from "querystringify"
export async function linkTo(path: string, data: any = {}, external: any = {}, replace: boolean = false) {
    //配置项
    const options: any = {
        data: JSON.stringify(data),
        ...external
    }
    const result: any = await navigateTo(path, options, replace)
    if (result.success === false) {
        if (result.errMsg.indexOf('fail can not redirectTo a tabbar page') > -1) {
            uni.switchTab({
                url: `${path}?${qs.stringify(options)}`
            })
        }
    }
}
//跳转
function navigateTo(path: string, options: any = {}, replace: boolean = false) {
    return new Promise((resolve) => {
        if (!replace) {
            uni.navigateTo({
                url: `${path}?${qs.stringify(options)}`,
                fail: (err) => {
                    resolve({
                        success: false,
                        errMsg: err.errMsg
                    })
                },
                success: () => {
                    resolve({
                        success: true
                    })
                }
            })
        } else {
            //跳转
            uni.redirectTo({
                url: `${path}?${qs.stringify(options)}`,
                fail: (err) => {
                    resolve({
                        success: false,
                        errMsg: err.errMsg
                    })
                },
                success: () => {
                    resolve({
                        success: true
                    })
                }
            })
        }
    })
}

//返回
export async function linkBack(de: number = 1) {
    return new Promise(resolve => {
        uni.navigateBack({
            delta: de,
            success: () => {
                resolve({
                    success: true
                })
            },
            fail: (err) => {
                resolve({
                    success: false,
                    errMsg: err.errMsg
                })
            }
        })
    })
}