import { debounce } from "lodash"
import { diffTwoDays } from "./date"
import { ROUTE_PATH } from "@/router/ROUTE_PATH"
import { EXTERNAL_TYPE } from "../define/external"
import { linkTo } from "./link"

export const articleFilter = (item: any) => {
    return {
        title: item.title,
        id: item.aid,
        date: diffTwoDays(item.release_time),
        sort: item.sort,
        author: item.author,
        url: item.url || item.ext.url,
        external: item.ext.external
    }
}
export const toArticleDetail = debounce((item: any): void => {
    //判断用何种打开方式，webview还是普通通知
    //普通方式打开
    if (item.external === EXTERNAL_TYPE.DEFAULT) {
        linkTo(ROUTE_PATH.ARTICLE_DETAIL, {}, {
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