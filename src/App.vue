<script lang="ts" setup>
	import {
		onLaunch
	} from "@dcloudio/uni-app"
	
	onLaunch(function() {
		//修改userAgent
		let userAgent: Array < string > | string = plus.navigator.getUserAgent()
		if (userAgent && userAgent.indexOf("anydoor") <= -1) {
			userAgent = userAgent.split("uni-app")[0]
			const info: any = uni.getAppBaseInfo()
			plus.navigator.setUserAgent(userAgent + ` anydoor${info.appVersion}-${info.appVersionCode}`, false)
		}
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
