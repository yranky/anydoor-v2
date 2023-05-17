export class Share {
    //分享文字
    public static shareText(type: SHARE_TYPE, title: string, text: string) {
        return new Promise((resolve, reject) => {
            if (type === SHARE_TYPE.QQ || type === SHARE_TYPE.WEIBO) {
                uni.share({
                    provider: type,
                    title: title,
                    href: text,
                    type: SHARE_CONTENT_TYPE.TEXT,
                    summary: text,
                    success: function (res) {
                        console.log(res)
                        resolve(res)
                    },
                    fail: function (err) {
                        console.log(err)
                        reject(err)
                    }
                })
            } else if (type === SHARE_TYPE.SHARE) {
                plus.share.sendWithSystem({ type: 'text', href: text }, function () {
                    resolve({})
                }, function (e) {
                    reject(e)
                });
            }
        })
    }
}

// 分享的类型
export enum SHARE_TYPE {
    SHARE = "share",
    QQ = "qq",
    // QQ_ZONE = "qq_zone",
    WEIBO = "sinaweibo"
}

// 分享内容的类型
export enum SHARE_CONTENT_TYPE {
    RICHTEXT = 0,
    TEXT = 1,
    PIC = 2,
    MUSIC = 3,
    VIDEO = 4,
    MPROGRAM = 5
}