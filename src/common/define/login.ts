//登录的几种形式定义 
export enum LOGIN_TYPE {
    //以code形式进行登录，主要是oauth授权
    CODE = "code",
    //以用户名形式进行登录
    USERNAME = 'username',
    //以手机号形式进行登录
    PHONE = "phone",
    //以邮箱形式进行登录
    MAIL = 'mail',
    //以邮箱验证码形式进行登录
    MAIL_CODE = "mail_code",
    //以手机验证码形式进行登录
    PHONE_CODE = "phone_code"
}


export enum LOGIN_UNION_TYPE {
    //qq登录
    QQ = "qq",
    //微博登录
    WEIBO = "sinaweibo"
}