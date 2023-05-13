import { diffTwoDays } from "./date"

export const articleFilter = (item: any) => {
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