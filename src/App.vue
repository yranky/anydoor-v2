<!--
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-23 22:05:02
 * @FilePath: \anydoor-v2\src\App.vue
 * @Description: 主入口文件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->
<script lang="ts" setup>
import {
	onError,
	onHide,
	onLaunch,
	onShow
} from "@dcloudio/uni-app"
import init, { initUser, initLesson, initFromStorageSync } from "./init"
import { OpenImg } from "./Open"
import { GLOABAL_EVENT } from "./common/define/IGlobalEvent"
import { onErrorCaptured } from "vue"
import nativeInit from "./common/native/nativeInit"

onLaunch(async function () {
	try {
		//获取wgt版本号 请勿调换顺序
		plus.runtime.getProperty(plus.runtime.appid ? plus.runtime.appid : '', (result: PlusRuntimeWidgetInfo) => {
			getApp().globalData!['versionCode'] = result.versionCode
			getApp().globalData!['versionName'] = result.version
		})
		//修改userAgent
		let userAgent: Array<string> | string = plus.navigator.getUserAgent()
		if (userAgent && userAgent.indexOf("anydoor") <= -1) {
			userAgent = userAgent.split("uni-app")[0]
			const info: any = uni.getAppBaseInfo()
			plus.navigator.setUserAgent(userAgent + ` anydoor${info.appVersion}-${info.appVersionCode}`, false)
		}
		// plus.navigator.setLogs(true)
		//从storage初始化
		initFromStorageSync()
		//打开开屏图
		OpenImg()
		//初始化
		await init()
		// const instance = await User.getInstance()
		// instance.insertUserAccount('1', '1')
		//初始化用户
		await initUser()
		//初始化课程
		await initLesson()
	} catch (e) {
		//初始化uni
		uni.$anydoor = {}
		//初始化原生插件
		nativeInit()
		//上报错误
		uni.$anydoor_native.Tool_Module.postErrorSync({
			content: '启动出错!' + e
		})
		//给用户提示
		uni.$anydoor_native.Dialog_Module.showMessageDialog(({
			title: '出错了!',
			content: '请尝试重新启动或重新进入官网(www.anydoor.top)下载最新版本安装，如果仍未解决，请尝试联系客服!错误原因:' + e,
			okText: '重新启动',
			cancelText: '取消',
			cancelable: false
		}), (res) => {
			if (res.data?.type === "ok") {
				plus.runtime.restart()
			}
		})
	}
})
onShow(() => {
	const args = plus.runtime.arguments;
	console.log(args)
	if (args) {
		// 处理args参数，如直达到某新页面等
	}
})
//应用隐藏
onHide(() => {
	uni.$emit(GLOABAL_EVENT.APP_HIDE)
})
//应用显示了
onShow(() => {
	uni.$emit(GLOABAL_EVENT.APP_SHOW)
})

//发生错误!
onError((err: string) => {
	console.log(err)
	try {
		//上报错误
		uni.$anydoor_native.Tool_Module.postErrorSync({
			content: err + ''
		})
		//toast出来
		uni.$anydoor_native.Toast_Module.showSync({
			text: err + ''
		})
		//打标记
		uni.$anydoor_native.Bugly_Module.pushDataSync({
			key: "web error",
			value: err + ''
		})
	} catch { }
})

onErrorCaptured((err: Error) => {
	console.log(err)
	try {
		//上报错误
		uni.$anydoor_native.Tool_Module.postErrorSync({
			content: `${err.name}-${err.message}-${err.cause}-${err.stack}`
		})
		//toast出来
		uni.$anydoor_native.Toast_Module.showSync({
			text: `${err.name}-${err.message}-${err.cause}-${err.stack}`
		})
		//打标记
		uni.$anydoor_native.Bugly_Module.pushDataSync({
			key: err.name,
			value: `${err.name}-${err.message}-${err.cause}-${err.stack}`
		})
	} catch { }
})
</script>
<style>
/* #ifdef APP-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-NVUE */
@import './tmui/scss/noNvue.css';


/* #endif */



/* #ifdef H5 */
body::-webkit-scrollbar,
div::-webkit-scrollbar,
*::-webkit-scrollbar {
	display: none;
}

body.pages-index-index uni-page-body,
body {
	padding-bottom: 0 !important;

}

text {
	font-family: "sans-serif";
}

/* #endif */
</style>