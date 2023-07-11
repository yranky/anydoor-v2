import useJiaowuStore from "@/store/jiaowu"
import { useUserStore } from "@/store/user"
import { authOpenid } from "../service/auth"
import qs from "querystringify"
/**
 * 
 * @param option 
 * 解析参数的类
 */
export default async function paramParse(option: any): Promise<IParamParse> {
    const userStore = useUserStore()
    const jiaowuStore = useJiaowuStore()
    //解析
    uni.$anydoor_native.Dialog_Module.showWaitingDialog({ title: '请稍等' })
    for (let key in option) {
        //教务登录
        if (option[key] == '$$jiaowuLogin$$') {
            if (!jiaowuStore.isLogin) {
                //跳转登录
                return {
                    success: false,
                    option: {}
                }
            }
        }
        //账户登录
        if (option[key] == '$$login$$') {
            if (!userStore.token) {
                return {
                    success: false,
                    option: {}
                }
            }
        }
        //头像注入
        if (option[key] == '$$avatar$$') option[key] = userStore.avatar
        //昵称注入
        if (option[key] == '$$nickname$$') option[key] = userStore.nickname
        try {
            //openid注入
            if (option[key] == '$$openid$$') {
                //获取aid
                const keyArr = extractParams(key)
                const aid = keyArr[1] || ""
                const data = await authOpenid({
                    aid: aid
                })
                option[key] = data.data.openid
            }
        } catch {
            option[key] = ""
        }
    }
    uni.$anydoor_native.Dialog_Module.hideWaitingDialog({})

    //注入到页面的参数
    option['$$$linkParams$$$'] = {}
    for (let key in option) {
        const item = extractParams(key)
        if (item.length > 0) {
            option['$$$linkParams$$$'][item[0]] = option[key]
        }
    }
    //拼接参数
    if (option.url && option.url.indexOf("?") > -1) {
        option.url = `${option.url}&${qs.stringify(option['$$$linkParams$$$'])}`
    } else if (option.url && option.url.indexOf("?") <= -1) {
        option.url = `${option.url}?${qs.stringify(option['$$$linkParams$$$'])}`
    }
    console.log(option)
    return {
        success: true,
        option
    }
}



export interface IParamParse {
    success: boolean,
    option: any
}

/**
 * @param {string} str
 * @return {string[]} result
 * @description: 提取[[]]中间的参数
 */
export function extractParams(str: string): string[] {
    const pattern = /\[\[(.*?)\]\]/g
    const matches = str.match(pattern) || []

    return matches.map(match => match.substring(2, match.length - 2));
}