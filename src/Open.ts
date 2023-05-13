/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-05-13 18:23:49
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-13 18:52:32
 * @FilePath: \anydoor-v2\src\open.ts
 * @Description: 开屏
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

//开屏图
export function OpenImg() {
    //开屏广告
    const data: IOpenImg = {
        src: '',
        timer: 5,
        introduction: '1',
        introductionText: '',
        linkTo: ''
    };
    //app启动时打开启动广告页
    const w = plus.webview.open(
        'hybrid/html/advertise/advertise.html',
        '本地地址', {
        top: "0",
        bottom: "0",
        zindex: 999
    },
        'fade-in',
        500
    );
    //是否成功
    let startSuccess: boolean = false;
    //超时时长
    let startTimerFail: number = 2;
    //倒计时
    let startTimerInt = setInterval(function () {
        if (startTimerFail <= 0) {
            if (!startSuccess) {
                plus.webview.close(w);
            }
            clearTimeout(startTimerInt);
        }
        startTimerFail--;
    }, 1000);
}

export interface IOpenImg {
    //链接
    src: string,
    //时长
    timer: number,
    //描述
    introduction: string,
    //描述文字
    introductionText: string,
    //链接
    linkTo: string
}