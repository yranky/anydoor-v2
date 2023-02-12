<template>
	<view class="relative">
		<tm-result v-if="info.error.show" class="error-show" :showBtn="info.error.showBtn" :color="info.error.color"
			:status="info.error.status" :btnText="info.error.btnText" :title="info.error.title"
			:subTitle="info.error.subTitle" @click="doResult(info.error.btnText)"></tm-result>
		<view class="fixed webview-progress" v-if="progress.show" :style="{
			backgroundColor: progressBg, width: progress.value + 'rpx', height: '5rpx',
			top: (props.config.progressTop ? props.config.progressTop : 0) + 'rpx'
		}">
		</view>
		<view :style="{ height: info.error.show ? 0 : '' }">
			<anydoorNativeWebview ref="mWebview" :unit="props.unit" :src="props.src" :config="props.config"
				:agent="props.userAgent" @onPageStart="pageStart" @onPageReady="pageReady"
				@onLoadResource="loadResource" @onUrlLoadingPatern="intercept" @onError="pluginError"
				@onPageError="pageError" @onPageHttpError="httpError" @onPageSSLError="sslError"
				@onNameMessage="onNameMessage" @onMessage="onMessage" @onTitleUpdate="titleUpdate"
				@onPageAlert="pageAlert" @onDownload="onDownload" @onProgress="onProgress" @onConsole="onConsole"
				@onNewWindow="onNewWindow" @onLinkPress="onLinkPress" @onImagePress="onImagePress"
				@onLinkClick="onLinkClick" @onImageClick="onImageClick" @onBack="onBack" @onScheme="onScheme"/>
		</view>
	</view>
</template>

<script lang="ts" setup>
import tmResult from "@/tmui/components/tm-result/tm-result.vue"
import anydoorNativeWebview from "./anydoor-native-webview"
import tmProgress from "@/tmui/components/tm-progress/tm-progress.vue"
import {
	ref,
	reactive,
	computed
} from "vue"
import getNETError from "@/common/network/error"
import theme from "@/tmui/tool/theme/theme"
import { IAnydoorWebviewRef, ICallHandlerOption, IDownloadResult, ILoadResourceResult, IMessageResult, INameMessageResult, IOnBackResult, IOnConsoleResult, IOnErrorResult, IOnImageClickResult, IOnImagePressResult, IOnLinkClickResult, IOnLinkPressResult, IOnNewWindowResult, IOnProgressResult, IOnSchemeResult, IPageAlertResult, IPageErrorResult, IPageHttpErrorResult, IPageReadyResult, IPageSSLErrorResult, IPageStartResult, ISetCookieOption, IShouldOverrideUrlLoadingOption, ITitleUpdateResult, IUrlLoadingPaternResult } from "./IAnydoorWebview"


const info = reactive({
	error: {
		show: false,
		color: "red",
		status: "",
		btnText: "",
		title: "",
		subTitle: "",
		showBtn: true,
	}
})

const props = defineProps({
	src: {
		type: String,
		default: "",
	},
	config: {
		type: Object,
		default: () => {
			return {}
		},
	},
	unit: {
		type: String,
		default: "rpx",
	},
	userAgent: {
		type: String,
		default: "",
	},
})

import {
	ACTION as NETErrorAction
} from "@/common/network/NETError"

//点击result按钮事件
const doResult = function (action: NETErrorAction) {
	switch (action) {
		case NETErrorAction.retry:
			//取消显示
			info.error.show = false
			reload()
			break
	}
}

//进度显示
const progress = reactive({
	value: 0,
	show: false
})
//进度背景
const progressBg = computed(() => {
	return theme.getColor("primary").value
})
const emits = defineEmits([
	"onPageStart",
	"onPageReady",
	"onLoadResource",
	"onUrlLoadingPatern",
	"onNameMessage",
	"onMessage",
	"onTitleUpdate",
	"onPageAlert",
	"onDownload",
	"onProgress",
	"onConsole",
	"onPageError",
	"onPageHttpError",
	"onPageSSLError",
	"onNewWindow",
	"onLinkPress",
	"onImagePress",
	"onLinkClick",
	"onImageClick",
	"onBack",
	"onScheme",
	"onError"
])
/**
 * 回调
 */
//webview页面开始加载回调
const pageStart = (e: IPageStartResult) => {
	//进度
	progress.show = true
	progress.value = 0
	emits("onPageStart", e)
}
//webview页面加载完成回调
const pageReady = (e: IPageReadyResult) => {
	//进度
	progress.show = false
	emits("onPageReady", e)
}
//webview页面资源加载回调
const loadResource = (e: ILoadResourceResult) => {
	emits("onLoadResource", e)
}
//url拦截了,detail:{url:拦截的url,pattern:拦截的串}
const intercept = (e: IUrlLoadingPaternResult) => {
	emits("onUrlLoadingPatern", e)
}
//jsbridge回调 指定name
const onNameMessage = (e: INameMessageResult) => {
	emits("onNameMessage", e)
}
//jsbridge回调 接收传递过来的信息 默认
const onMessage = (e: IMessageResult) => {
	emits("onMessage", e)
}
//标题更改回调
const titleUpdate = (e: ITitleUpdateResult) => {
	emits("onTitleUpdate", e)
}
//网页alert回调
const pageAlert = (e: IPageAlertResult) => {
	emits("onPageAlert", e)
}
//网站下载的回调
const onDownload = (e: IDownloadResult) => {
	emits("onDownload", e)
}
//加载进度的回调
const onProgress = (e: IOnProgressResult) => {
	progress.value = e.progress * 750 / 100
	emits("onProgress", e)
}
//控制台打印回调
const onConsole = (e: IOnConsoleResult) => {
	emits("onConsole", e)
}
//pageError
const pageError = (e: IPageErrorResult) => {
	progress.show = false
	if (e.isCurrent) {
		info.error = getNETError(e.errorCode)
	}
	if (e.description === "net::ERR_NAME_NOT_RESOLVED") {
		info.error.subTitle = "无法连接(ERR_NAME_NOT_RESOLVED)"
		info.error.showBtn = false
	}
	emits("onPageError", e)
}
//http 安卓6及以上,detail:{url:url,description:描述，errorCode：code}
const httpError = (e: IPageHttpErrorResult) => {
	progress.show = false
	if (e.isCurrent) {
		info.error = getNETError(e.errorCode, "httpError")
	}
	emits("onPageHttpError", e)
}
//ssl错误 网站证书错误,detail:{url:url,=+==++detail}
const sslError = (e: IPageSSLErrorResult) => {
	emits("onPageSSLError", e)
}
//新窗口
const onNewWindow = (e: IOnNewWindowResult) => {
	emits("onNewWindow", e)
}
//链接长按
const onLinkPress = (e: IOnLinkPressResult) => {
	emits("onLinkPress", e)
}
//有src的图片长按
const onImagePress = (e: IOnImagePressResult) => {
	emits("onImagePress", e)
}
//链接点击事件
const onLinkClick = (e: IOnLinkClickResult) => {
	emits("onLinkClick", e)
}
//图片点击事件
const onImageClick = (e: IOnImageClickResult) => {
	emits("onImageClick", e)
}
//返回
const onBack = (e: IOnBackResult) => {
	info.error.show = false
	emits("onBack", e)
}
//拦截scheme
const onScheme = (e: IOnSchemeResult) => {
	emits("onScheme", e)
}
//插件try catch捕获的错误
const pluginError = (e: IOnErrorResult) => {
	emits("onError", e)
}
//end

const mWebview: any = ref<IAnydoorWebviewRef>()

/**
 * 向外暴露的接口
 *
 */
// url拦截
const shouldOverrideUrlLoading = (
	option: IShouldOverrideUrlLoadingOption
) => {
	return mWebview.value.shouldOverrideUrlLoading(option)
}
//获取cookie
const getCookie = (url: string) => {
	return mWebview.value.getCookie(url)
}
//清除指定cookie,通过设置cookie为空来实现
const removeCookie = (url: string) => {
	return mWebview.value.removeCookie(url)
}
//清空cookie
const removeAllCookie = () => {
	return mWebview.value.removeAllCookie()
}
//setCookie 设置cookie
const setCookie = (option: ISetCookieOption) => {
	return mWebview.value.setCookie(option)
}
//清空storage
const removeAllStorage = () => {
	return mWebview.value.removeAllStorage()
}

//设置夜间模式 实际上并没有很大效果
const setDark = (dark: boolean = true) => {
	return mWebview.value.setDark(dark)
}
//是否可返回
const canBack = () => {
	return mWebview.value.canBack()
}
//返回上一层
const back = () => {
	return mWebview.value.back()
}
//下一层
const forward = () => {
	return mWebview.value.forward()
}
//上一层或下一层
const go = (step: string) => {
	return mWebview.value.go(step)
}
//重新加载当前页面
const reload = () => {
	return mWebview.value.reload()
}
//加载url
const loadUrl = (url: string) => {
	return mWebview.value.loadUrl(url)
}
//清除缓存
const clear = (disk: boolean = true) => {
	return mWebview.value.clear(disk)
}
//清除所有缓存,包含cookie和localstorage缓存
const clearAll = (disk: boolean = true) => {
	return mWebview.value.clearAll(disk)
}
//清除历史
const clearHistory = () => {
	return mWebview.value.clearHistory()
}
//获取当前title
const getTitle = () => {
	return mWebview.value.getTitle()
}
//获取当前url
const getUrl = () => {
	return mWebview.value.getUrl()
}
//停止加载
const stopLoading = () => {
	return mWebview.value.stopLoading()
}
//向网页发送信息|网页的回调 message:String
const send = (message: string) => {
	return mWebview.value.send(message)
}
//向网页注册一个handler name:string  通过onNameMessage接收
const registerHandler = (name: string) => {
	return mWebview.value.registerHandler(name)
}
//call网页的handler
const callHandler = (data: ICallHandlerOption) => {
	return mWebview.value.callHandler(data)
}
//获取user-agent
const getUserAgent = () => {
	return mWebview.value.getUserAgent()
}
//设置user-agent
const setUserAgent = (s: string) => {
	return mWebview.value.setUserAgent(s)
}
//end

defineExpose({
	shouldOverrideUrlLoading,
	getCookie,
	removeCookie,
	removeAllCookie,
	setCookie,
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
	registerHandler,
	callHandler,
	setUserAgent,
	getUserAgent
})
</script>
<style scoped lang="scss">
.webview-progress {
	transition: width 0.3s;
}
</style>
