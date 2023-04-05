<!--
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-18 20:24:23
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-05 09:48:47
 * @FilePath: \anydoor-v2\src\App.vue
 * @Description: 主入口文件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->
<script lang="ts" setup>
import {
	onLaunch
} from "@dcloudio/uni-app"
import init,{initUser} from "./init"


onLaunch(async function () {
	
	//修改userAgent
	let userAgent: Array<string> | string = plus.navigator.getUserAgent()
	if (userAgent && userAgent.indexOf("anydoor") <= -1) {
		userAgent = userAgent.split("uni-app")[0]
		const info: any = uni.getAppBaseInfo()
		plus.navigator.setUserAgent(userAgent + ` anydoor${info.appVersion}-${info.appVersionCode}`, false)
	}
	// plus.navigator.setLogs(true)
	
	//初始化
	await init()

	// const instance = await User.getInstance()
	// instance.insertUserAccount('1', '1')

	//初始化用户
	await initUser()
	
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
