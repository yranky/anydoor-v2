import useJiaowuStore from "@/store/jiaowu"
import { useUserStore } from "@/store/user"

/**
 * 
 * @param option 
 * 解析参数的类
 */
export default async function paramParse(option: any): Promise<IParamParse> {
    const userStore = useUserStore()
    const jiaowuStore = useJiaowuStore()
    //解析
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
    }

    //注入到页面的参数
    option['$$$linkParams$$$'] = {}
    for (let key in option) {
        const item = key.split("__link__")
        if (item.length >= 3) {
            option['$$$linkParams$$$'][item[1]] = option[key]
        }
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