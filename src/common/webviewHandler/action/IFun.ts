export interface ILoginResult {
    success: boolean,
    isLogin: boolean
}

export enum ILoginType {
    CENTER = "center",
    TOKEN = "token",
    //是否登录
    CHECK = "check",
    //扫码登录
    SCAN = "scan"
}


type IMENU_ITEM_DETAIL = {
    [key in MENU_ITEM]: {
        name: string,
        id: key
    }
}
export enum MENU_ITEM {
    //刷新
    FRESH = "fresh",
    //关闭
    CLOSE = "close",
    //在浏览器中打开
    OPEN_BROWSER = "open_on_browser",
    //分享到QQ
    SHARE_ON_QQ = "share_on_qq",
    //分享到QQ空间
    // SHARE_ON_QQ_ZONE = "share_on_qq_zone",
    //分享到新浪微博
    SHARE_ON_WEIBO = "share_on_weibo",
    //其它分享
    SHARE = "share",
    //复制链接
    COPY = "copy"
}
export const menuItemDetail: IMENU_ITEM_DETAIL = {
    [MENU_ITEM.FRESH]: {
        name: "刷新",
        id: MENU_ITEM.FRESH
    },
    [MENU_ITEM.CLOSE]: {
        name: "退出",
        id: MENU_ITEM.CLOSE
    },
    [MENU_ITEM.OPEN_BROWSER]: {
        name: "在浏览器中打开",
        id: MENU_ITEM.OPEN_BROWSER
    },
    [MENU_ITEM.SHARE_ON_QQ]: {
        name: "分享到QQ",
        id: MENU_ITEM.SHARE_ON_QQ
    },
    // [MENU_ITEM.SHARE_ON_QQ_ZONE]: {
    //     name: "分享到QQ空间",
    //     id: MENU_ITEM.SHARE_ON_QQ_ZONE
    // },
    [MENU_ITEM.SHARE_ON_WEIBO]: {
        name: "分享到微博",
        id: MENU_ITEM.SHARE_ON_WEIBO
    },
    [MENU_ITEM.SHARE]: {
        name: "分享",
        id: MENU_ITEM.SHARE
    },
    [MENU_ITEM.COPY]: {
        name: "复制",
        id: MENU_ITEM.COPY
    }
}