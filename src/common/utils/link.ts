import qs from "querystringify"
import { NAVIGATE_TYPE } from "@/common/define/navigateType"
import { ROUTE_PATH } from "@/router/ROUTE_PATH"
import ToastModule from "../native/toast/ToastModule"
import paramParse, { IParamParse } from "./paramParse"
import useConfigStore from "@/store/config"


//链接
//菜单跳转
export function menuLink(item: any) {
    menuLinkTo(item.url, item.params || [], item.link_type || '')
}
//轮播图跳转
export function swiperLink(item: any) {
    menuLinkTo(item.link, item.params || [], item.link_type || '')
}

//菜单链接具体
export async function menuLinkTo(path: string, params: any[], type: NAVIGATE_TYPE) {
    //解析参数
    let option: any = {}
    //解析参数
    for (let i = 0; i < params.length; i++) {
        option[params[i].key] = params[i].param
    }
    //解析参数
    const parseResult: IParamParse = await paramParse(option)
    if (!parseResult.success) return
    else option = parseResult.option

    //打开微应用
    if (type === NAVIGATE_TYPE.MPROGRAM) {
        const configStore = useConfigStore()
        uni.$anydoor.MProgram?.open(path, {
            ...option,
            debug: configStore.debug
        })
    } else if (type === NAVIGATE_TYPE.PAGE) {
        linkTo(path, option, option)
    } else if (type === NAVIGATE_TYPE.LEGO) {
        linkTo(ROUTE_PATH.WEBVIEW, {
            ...option,
            url: option.url
        })
    } else if (type === NAVIGATE_TYPE.WEBVIEW) {
        linkTo(ROUTE_PATH.WEBVIEW, {
            ...option,
            url: option.url
        })
    } else {
        ToastModule.show({
            text: '暂不支持!请尝试升级APP版本'
        })
    }
}

/**
 * @param {string} path 路径
 * @param {any} data 传递给页面的数据，用data包裹
 * @param {any} external 传递给页面的数据，不用data包裹的
 * @param {boolean} replace 是否替换
 * @return {*}
 * @description: 跳转
 */
export async function linkTo(path: string, data: any = {}, external: any = {}, replace: boolean = false, linkOption: any = {}): Promise<any> {
    const options: any = {
        ...external,
        data: JSON.stringify(data)
    }
    console.log(options)
    const result: any = await navigateTo(path, options, replace, linkOption)
    if (result.success === false) {
        if (result.errMsg.indexOf('fail can not redirectTo a tabbar page') > -1) {
            uni.switchTab({
                ...linkOption,
                url: `${path}?${qs.stringify(options)}`
            })
        }
    }
}
//跳转
function navigateTo(path: string, options: any = {}, replace: boolean = false, linkOption: any = {}) {
    return new Promise((resolve) => {
        if (!replace) {
            uni.navigateTo({
                ...linkOption,
                url: `${path}?${qs.stringify(options)}`,
                fail: (err: { errMsg: any }) => {
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
                ...linkOption,
                url: `${path}?${qs.stringify(options)}`,
                fail: (err: { errMsg: any }) => {
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
export async function linkBack(de: number = 1, linkOption: any = {}) {
    return new Promise(resolve => {
        uni.navigateBack({
            ...linkOption,
            delta: de,
            success: () => {
                resolve({
                    success: true
                })
            },
            fail: (err: { errMsg: any }) => {
                resolve({
                    success: false,
                    errMsg: err.errMsg
                })
            }
        })
    })
}

//参数转换获取
export function linkOptionsParse(options: any) {
    try {
        const data = JSON.parse(decodeURIComponent(options.data))
        options['data'] = data || {}
    } catch {
        options['data'] = {}
    }
    return options
}

//获取hostname
export function getHostnameByUrl(url: string) {
    const protocolEnd = url.indexOf("://");
    if (protocolEnd < 0) {
        return "";
    }
    let hostnameStart = protocolEnd + 3;
    let hostnameEnd = url.indexOf("/", hostnameStart);
    if (hostnameEnd < 0) {
        hostnameEnd = url.indexOf("?", hostnameStart);
        if (hostnameEnd < 0) {
            hostnameEnd = url.indexOf("#", hostnameStart);
            if (hostnameEnd < 0) {
                hostnameEnd = url.length;
            }
        }
    }
    let hostname = url.substring(hostnameStart, hostnameEnd);

    const portStart = hostname.indexOf(":");
    if (portStart >= 0) {
        hostname = hostname.substring(0, portStart);
    }

    return hostname;
}