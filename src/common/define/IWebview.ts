/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-19 10:11:26
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-12 22:11:18
 * @FilePath: \anydoor-v2\src\common\define\IWebview.ts
 * @Description: webview的相关配置
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export interface IWebviewItem {
    //url链接
    url: string,
    //title,默认的title
    title: string,
    //titleChange title是否可变(默认可变)
    titleChange?: boolean,
    //copyLink 是否可复制链接(默认不可以)
    copyLink?: boolean,
    //share 是否可分享(默认不可以)
    share?: boolean,
    //open 是否可以通过外部浏览器打开(默认不可以)
    open?: boolean,
    //是否显示刷新按钮(默认可刷新)
    refresh?: boolean,
    //点击预览图片(默认为不预览)
    clickPreviewImage?: boolean,
    //长按保存图片(默认为保存)
    pressSaveImage?: boolean,
    //post请求
    post: number | undefined | boolean,
    //参数
    params: {
        [key: string]: number | string
    }
}


export function IWebviewItemFilter(item: any): IWebviewItem {
    return {
        url: item.url,
        title: item.title || "",
        titleChange: item.titleChange || true,
        copyLink: item.copyLink || false,
        share: item.share || false,
        open: item.open || false,
        refresh: item.refresh || true,
        clickPreviewImage: item.clickPreviewImage || false,
        pressSaveImage: item.pressSaveImage || true,
        post: item.post == 1 ? true : false,
        params: item['$$$linkParams$$$'] || {}
    }
}