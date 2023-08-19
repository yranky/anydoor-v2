import CODE, { restful } from "@/common/define/code"
import ToastModule from "@/common/native/toast/ToastModule"
import { post } from "@/common/request/http"
import { UNI_STORAGE } from "@/common/database/UNI_STORAGE"
import { MENU_TYPES } from "@/common/define/menuType"
import { isVersionMatch } from "../utils/isVersionMatch"

//首页菜单列表
export async function listIndexMenu(formData: any): Promise<any> {
    const data: any = await post('menu_list', {
        ...formData,
        type: JSON.stringify([MENU_TYPES.INDEX])
    })
    let listData = []
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        listData = data.data.map((item: any) => {
            return {
                ...item,
                sort: item.sort,
                mid: item.mid,
                version: item.version,
                title: item.name,
                path: item.icon,
                type: item.type,
                device: item.device,
                icon_type: item.icon_type
            }
        })
        //保存到缓存
        uni.setStorageSync(UNI_STORAGE.MENU_INDEX_LIST, listData)
    }
    return listData || []
}

// 我的部分的menu
export async function listMyMenu(formData: any): Promise<any> {
    const data: any = await post('menu_list', {
        ...formData,
        type: JSON.stringify([
            MENU_TYPES.JW,
            MENU_TYPES.LIFE,
            MENU_TYPES.MY,
            MENU_TYPES.RECOMMEND
        ])
    })
    let lists: any = {}
    if (data.code !== CODE.SUCCESS) {
        ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    } else {
        data.data.forEach((item: any) => {
            //菜单的item
            const menu_item = {
                ...item,
                sort: item.sort,
                mid: item.mid,
                version: item.version,
                title: item.name,
                path: item.icon,
                type: item.type,
                device: item.device,
                icon_type: item.icon_type
            }
            if (lists[MENU_TYPES.JW] === undefined) lists[MENU_TYPES.JW] = []
            if (lists[MENU_TYPES.LIFE] === undefined) lists[MENU_TYPES.LIFE] = []
            if (lists[MENU_TYPES.MY] === undefined) lists[MENU_TYPES.MY] = []
            if (lists[MENU_TYPES.RECOMMEND] === undefined) lists[MENU_TYPES.RECOMMEND] = []
            //教务
            if ((item.type || []).indexOf(MENU_TYPES.JW) > -1) {
                lists[MENU_TYPES.JW].push(menu_item)
            }
            //生活
            if ((item.type || []).indexOf(MENU_TYPES.LIFE) > -1) {
                lists[MENU_TYPES.LIFE].push(menu_item)
            }
            //我的 
            if ((item.type || []).indexOf(MENU_TYPES.MY) > -1) {
                lists[MENU_TYPES.MY].push(menu_item)
            }
            //推荐 RECOMMEND
            if ((item.type || []).indexOf(MENU_TYPES.RECOMMEND) > -1) {
                lists[MENU_TYPES.RECOMMEND].push(menu_item)
            }
        })

        //filter
        for (let key in lists) {
            lists[key] = lists[key].filter((item: any) => isVersionMatch(getApp().globalData!['versionCode'], item.version))
        }

        console.log(data.data)
        //保存到缓存
        uni.setStorageSync(UNI_STORAGE.MENU_MY_LIST, lists)
    }
    return lists || {}
}