<template>
    <view>
        <anydoor-native-webview ref="mWebview" :src="props.src" :agent="props.userAgent" :bugly="props.bugly"
            :style="{ width: '750rpx', height: viewHeight }" :config="props.config" @on-back="onBack"
            @page-start="pageStart" @on-scheme="onScheme" @url-loading-pattern="urlLoadingPatern" @page-ready="pageReady"
            @page-error="pageError" @page-http-error="pageHttpError" @page-s-s-l-error="pageSSLError"
            @load-resource="loadResource" @on-download="onDownload" @on-message="onMessage" @on-name-message="onNameMessage"
            @on-error="onError" @title-update="titleUpdate" @page-alert="pageAlert" @on-progress="onProgress"
            @on-console="onConsole" @on-new-window="onNewWindow" @on-link-press="onLinkPress" @on-image-press="onImagePress"
            @on-link-click="onLinkClick" @on-image-click="onImageClick">
        </anydoor-native-webview>
    </view>
</template>

<script lang="ts" setup>
import {
    ref,
    reactive,
    computed,
    onMounted
} from "vue"

import {
    IAnydoorEventResult,
    IAnydoorWebviewConfig, IAnydoorWebviewRef, ICallHandlerOption, IDownloadResult, ILoadResourceResult, IMessageResult, INameMessageResult, IOnBackResult, IOnConsoleResult, IOnErrorResult, IOnImageClickResult, IOnImagePressResult, IOnLinkClickResult, IOnLinkPressResult, IOnNewWindowResult, IOnProgressResult, IOnSchemeResult,
    IPageAlertResult,
    IPageErrorResult, IPageHttpErrorResult, IPageReadyResult, IPageSSLErrorResult,
    IPageStartResult, IPostUrlOption, ISetCookieOption, IShouldOverrideUrlLoadingOption, ITitleUpdateResult, IUrlLoadingPaternResult
} from "./IAnydoorWebview"


const props = withDefaults(defineProps<{
    src: string,
    bugly?: boolean,
    config?: IAnydoorWebviewConfig,
    unit?: string,
    userAgent?: string
}>(), {
    src: "",
    bugly: true,
    config: (): IAnydoorWebviewConfig => {
        return {
        }
    },
    unit: "rpx",
    userAgent: ""
})

const mWebview = ref<IAnydoorWebviewRef>()

const emits = defineEmits(['onBack', "onPageStart", 'onScheme', 'onUrlLoadingPatern', 'onPageReady', 'onPageError',
    "onPageHttpError", 'onPageSSLError', 'onLoadResource', 'onDownload', 'onMessage', 'onNameMessage', 'onError',
    'onTitleUpdate', 'onPageAlert', 'onProgress', 'onConsole', 'onNewWindow', 'onLinkPress', 'onLinkClick', 'onImageClick',
    'onImagePress'
])

//返回上一层
const onBack = (res: IAnydoorEventResult<IOnBackResult>) => {
    emits("onBack", res.detail)
}
//页面开始
const pageStart = (res: IAnydoorEventResult<IPageStartResult>) => {
    emits("onPageStart", res.detail)
}
//未识别的scheme
const onScheme = (res: IAnydoorEventResult<IOnSchemeResult>) => {
    emits("onScheme", res.detail)
}
//拦截的url
const urlLoadingPatern = (res: IAnydoorEventResult<IUrlLoadingPaternResult>) => {
    emits("onUrlLoadingPatern", res.detail)
}
//页面加载完成
const pageReady = (res: IAnydoorEventResult<IPageReadyResult>) => {
    emits("onPageReady", res.detail)
}
//页面错误
const pageError = (res: IAnydoorEventResult<IPageErrorResult>) => {
    emits("onPageError", res.detail)
}
//页面http错误
const pageHttpError = (res: IAnydoorEventResult<IPageHttpErrorResult>) => {
    emits("onPageHttpError", res.detail)
}
//ssl错误
const pageSSLError = (res: IAnydoorEventResult<IPageSSLErrorResult>) => {
    emits("onPageSSLError", res.detail)
}
//加载资源
const loadResource = (res: IAnydoorEventResult<ILoadResourceResult>) => {
    emits("onLoadResource", res.detail)
}
//下载
const onDownload = (res: IAnydoorEventResult<IDownloadResult>) => {
    emits("onDownload", res.detail)
}
//消息
const onMessage = (res: IAnydoorEventResult<IMessageResult>) => {
    console.log(res)
    emits("onMessage", res.detail)
}
//有名称的消息
const onNameMessage = (res: IAnydoorEventResult<INameMessageResult>) => {
    console.log(res)
    emits("onNameMessage", res.detail)
}
//错误
const onError = (res: IAnydoorEventResult<IOnErrorResult>) => {
    emits("onError", res.detail)
}
//标题更新
const titleUpdate = (res: IAnydoorEventResult<ITitleUpdateResult>) => {
    emits("onTitleUpdate", res.detail)
}
//js alert
const pageAlert = (res: IAnydoorEventResult<IPageAlertResult>) => {
    emits("onPageAlert", res.detail)
}
//进度
const onProgress = (res: IAnydoorEventResult<IOnProgressResult>) => {
    emits("onProgress", res.detail)
}
//控制台
const onConsole = (res: IAnydoorEventResult<IOnConsoleResult>) => {
    emits("onConsole", res.detail)
}
//新窗口
const onNewWindow = (res: IAnydoorEventResult<IOnNewWindowResult>) => {
    emits("onNewWindow", res.detail)
}

//链接长按
const onLinkPress = (res: IAnydoorEventResult<IOnLinkPressResult>) => {
    emits("onLinkPress", res.detail)
}
//图片长按
const onImagePress = (res: IAnydoorEventResult<IOnImagePressResult>) => {
    emits("onImagePress", res.detail)
}
//链接点击
const onLinkClick = (res: IAnydoorEventResult<IOnLinkClickResult>) => {
    emits("onLinkClick", res.detail)
}

//图片点击
const onImageClick = (res: IAnydoorEventResult<IOnImageClickResult>) => {
    emits("onImageClick", res.detail)
}

//设置userAgent
const setUserAgent = (userAgent: string): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.setUserAgent(userAgent, (res) => {
            resolve(res.success)
        })
    })
}
//获取userAgent
const getUserAgent = async (): Promise<string | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.getUserAgent((res) => {
            resolve(res.data)
        })
    })
}
//拦截
const shouldOverrideUrlLoading = (option: IShouldOverrideUrlLoadingOption): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.shouldOverrideUrlLoading(option, (res) => {
            resolve(res.data)
        })
    })
}
//获取cookie
const getCookie = (url: string): Promise<string | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.getCookie(url, (res) => {
            resolve(res.data)
        })
    })
}
//设置cookie
const setCookie = (option: ISetCookieOption): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.setCookie(option, (res) => {
            resolve(res.success)
        })
    })
}
const removeAllCookie = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.removeAllCookie((res) => {
            resolve(res.success)
        })
    })
}
const removeCookie = (url: string): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.removeCookie(url, (res) => {
            resolve(res.success)
        })
    })
}
const removeAllStorage = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.removeAllStorage((res) => {
            resolve(res.success)
        })
    })
}
const setDark = (open: boolean): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.setDark(open, (res) => {
            resolve(res.success)
        })
    })
}
const canBack = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        return mWebview.value?.canBack((res) => {
            resolve(res.data)
        })
    })
}
const back = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.back((res) => {
            resolve(res.success)
        })
    })
}
const forward = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.forward((res) => {
            resolve(res.success)
        })
    })
}
const go = (index: number): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.go(index, (res) => {
            resolve(res.success)
        })
    })
}
const reload = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.reload((res) => {
            resolve(res.success)
        })
    })
}
const loadUrl = (url: string): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.loadUrl(url, (res) => {
            resolve(res.success)
        })
    })
}
const clear = (disk: boolean): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.clear(disk, (res) => {
            resolve(res.success)
        })
    })
}
const clearAll = (disk: boolean): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.clearAll(disk, (res) => {
            resolve(res.success)
        })
    })
}
const clearHistory = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.clearHistory((res) => {
            resolve(res.success)
        })
    })
}
const getTitle = (): Promise<string | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.getTitle((res) => {
            resolve(res.data)
        })
    })
}
const getUrl = (): Promise<string | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.getUrl((res) => {
            resolve(res.data)
        })
    })
}
const stopLoading = (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.stopLoading((res) => {
            resolve(res.success)
        })
    })
}
const send = (data: string, callbackFn: (res: string) => void): Promise<string | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.send(data, (res) => {
            resolve(res.data)
        })
    })
}
const callHandler = (data: ICallHandlerOption, callbackFn: (res: string) => void): Promise<string | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.callHandler(data, (res) => {
            resolve(res.data)
        })
    })
}
const registerHandler = (name: string): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mWebview.value?.registerHandler(name, (res) => {
            resolve(res.success)
        })
    })
}

const postUrl = (data: IPostUrlOption): Promise<boolean> => {
    return new Promise((resolve) => {
        mWebview.value?.postUrl(data, (res) => {
            resolve(res.success)
        })
    })
}


/**
     * 计算属性
     */
//窗口高度
const viewHeight = computed<String>(() => {
    if (typeof props.config.height === "string") {
        return props.config.height
    } else if (typeof props.config.height === "number") {
        return props.config.height + props.unit
    }
    // @ts-ignore
    const height = (uni.getSystemInfoSync().safeArea.height / (uni.upx2px(100) / 100)) + 'rpx'
    return height;
})



defineExpose({
    setUserAgent,
    getUserAgent,
    shouldOverrideUrlLoading,
    getCookie,
    setCookie,
    removeAllCookie,
    removeCookie,
    removeAllStorage,
    setDark,
    canBack,
    back,
    forward,
    go,
    reload,
    loadUrl,
    clear,
    clearAll,
    clearHistory,
    getTitle,
    getUrl,
    stopLoading,
    send,
    callHandler,
    registerHandler,
    postUrl
})
</script>
