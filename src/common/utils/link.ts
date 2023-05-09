import qs from "querystringify"
import { NAVIGATE_TYPE } from "@/common/define/navigateType"
import { ROUTE_PATH } from "@/router/ROUTE_PATH"

//链接
//菜单跳转
export function menuLink(item: any) {
    menuLinkTo(item.url, item.params || [], item.link_type || '')
}
//菜单链接具体
export async function menuLinkTo(path: string, params: any[], type: NAVIGATE_TYPE) {
    //解析参数
    const option: any = {}
    //解析参数
    for (let i = 0; i < params.length; i++) {
        option[params[i].key] = params[i].param
    }
    //打开微应用
    if (type === NAVIGATE_TYPE.MPROGRAM) {
        uni.$anydoor.MProgram?.open(path)
    } else if (type === NAVIGATE_TYPE.PAGE) {
        linkTo(path, option, option)
    } else {
        linkTo(ROUTE_PATH.WEBVIEW, {
            ...option,
            url: path
        })
    }
}


export async function linkTo(path: string, data: any = {}, external: any = {}, replace: boolean = false) {
    //配置项
    const options: any = {
        ...external,
        data: JSON.stringify(data)
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