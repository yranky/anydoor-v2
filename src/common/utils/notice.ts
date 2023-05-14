import { ROUTE_PATH } from "@/router/ROUTE_PATH"
import { debounce } from "lodash"
import { EXTERNAL_TYPE } from "../define/external"
import { linkTo } from "./link"
import { diffTwoDays } from "./date"

export const toNoticeDetail = debounce((item: any): void => {
    //判断用何种打开方式，webview还是普通通知
    //普通方式打开
    if (item.external === EXTERNAL_TYPE.DEFAULT) {
        linkTo(ROUTE_PATH.NOTICE_DETAIL, {}, {
            id: item.id,
            title: item.title
        })
    } else {
        linkTo(ROUTE_PATH.WEBVIEW, {
            url: item.url,
            title: item.title
        })
    }
}, 300)


export const noticeFilter = (item: any) => {
    return {
        title: item.title,
        id: item.nid,
        date: diffTwoDays(item.start_time),
        sort: item.sort,
        author: item.author,
        url: item.ext.url,
        external: item.ext.external
    }
}