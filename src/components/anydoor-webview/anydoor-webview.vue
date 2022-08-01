<template>
	<view>
		<anydoor-native-webview ref="mWebview" :src="src" :config="webConfig"
			:style="{width:'750rpx', height:viewHeight }" @pageStart="pageStart" @pageReady="pageReady"
			@loadResource="loadResource" @UrlLoadingPattern="intercept" @onError="pluginError" @pageError="pageError"
			@pageHttpError="httpError" @pageSSLError="sslError" @onNameMessage="onNameMessage" @onMessage="onMessage"
			@titleUpdate="titleUpdate" @pageAlert="pageAlert" @onDownload="onDownload" @progress="onProgress"
			@console="onConsole">
		</anydoor-native-webview>
	</view>
</template>

<script lang="ts" setup>
	import utils from "./utils.js"
	
	import {
		ref,
		reactive,
		computed,
		onMounted
	} from "vue"
	


	const props = defineProps({
		src: {
			type: String,
			default: ""
		},
		config: {
			type: Object,
			default: () => {
				return {}
			}
		},
		unit: {
			type: String,
			default: "rpx"
		}
	})

	const emits = defineEmits(['pageStart', 'pageReady', 'loadResource', 'intercept',
		'onNameMessage', 'onMessage', 'titleUpdate', 'pageAlert', 'onDownload', 'onProgress',
		"onConsole", 'pageError', 'httpError', 'sslError'
	])

	const mWebview = ref(null)

	//拦截串
	const interceptTmp: {
		regs: Array < Object > ,
		mode: string,
		complete: boolean
	} = reactive({
		regs: [],
		mode: "",
		complete: false
	})
	/**
	 * 回调
	 */
	//webview页面开始加载回调
	const pageStart = (e) => {
		emits("pageStart", e.detail)
	}
	//webview页面加载完成回调
	const pageReady = (e) => {
		emits("pageReady", e.detail)
	}
	//webview页面资源加载回调
	const loadResource = (e) => {
		emits("loadResource", e.detail)
	}
	//url拦截了,detail:{url:拦截的url,pattern:拦截的串}
	const intercept = (e) => {
		emits("intercept", e.detail)
	}
	//jsbridge回调 指定name
	const onNameMessage = (e) => {
		emits("onNameMessage", e.detail)
	}
	//jsbridge回调 接收传递过来的信息 默认
	const onMessage = (e) => {
		emits("onMessage", e.detail)
	}
	//标题更改回调
	const titleUpdate = (e) => {
		emits("titleUpdate", e.detail)
	}
	//网页alert回调
	const pageAlert = (e) => {
		emits("pageAlert", e.detail)
	}
	//网站下载的回调
	const onDownload = (e) => {
		emits("onDownload", e.detail)
	}
	//加载进度的回调
	const onProgress = (e) => {
		emits("onProgress", e.detail)
	}
	//控制台打印回调
	const onConsole = (e) => {
		emits("onConsole", e.detail)
	}
	//pageError
	const pageError = (e) => {
		emits("pageError", e.detail)
	}
	//http 安卓6及以上,detail:{url:url,description:描述，errorCode：code}
	const httpError = (e) => {
		emits("httpError", e.detail)
	}
	//ssl错误 网站证书错误,detail:{url:url,detail}
	const sslError = (e) => {
		emits("sslError", e.detail)
	}
	//插件try catch捕获的错误
	const pluginError = (e) => {
		console.log(e)
	}
	// end

	/**
	 * 向外暴露的接口
	 * 
	 */
	// url拦截
	const setInterceptPattern = (regs: Array < Object > = [], mode: string = 'notAllow', complete ? : boolean) => {
		if (mWebview.value === null) {
			interceptTmp.regs = regs
			interceptTmp.mode = mode
			interceptTmp.complete = complete || interceptTmp.complete
			return false
		}
		interceptTmp.complete = true
		//不采用base64
		mWebview.value.shouldOverrideUrlLoading({
			regs: regs,
			mode: mode === 'allow' ? 'allow' : 'notAllow'
		})
	}
	//获取cookie
	const getCookie = async (url: string) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!");
			else {
				mWebview.value.getCookie(url, (e) => {
					resolve({
						success: e.success,
						url: e.url,
						cookie: e.cookie === undefined ? "" : e.cookie
					})
				})
			}
		})
	}
	//清除指定cookie,通过设置cookie为空来实现
	const clearCookie = (url: string) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else {
				//先get
				mWebview.value.removeCookie(url, () => {
					resolve({})
				})

			}
		})
	}
	//清空cookie
	const clearAllCookie = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!");
			else {
				mWebview.value.removeAllCookie("", () => {
					resolve({})
				})
			}
		})
	}
	//setCookie 设置cookie
	const setCookie = (url: string, cookie: string, reload: boolean = false) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!");
			else {
				let domain = url;
				if (/https?\:\/\//.test(url)) {
					domain = url.match(/https?:\/\/([^/]+)/i)[1];
				}
				mWebview.value.setCookie({
					url: domain,
					cookie: cookie,
					reload: reload ? "1" : "0"
				}, () => {
					resolve({})
				})
			}
		})
	}
	//清空storage
	const removeAllStorage = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else {
				mWebview.value.removeAllStorage("", () => {
					resolve({})
				});
			}
		})
	}

	//设置夜间模式 实际上并没有很大效果
	const setDark = (dark: boolean = true) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else {
				mWebview.value.setDark(dark ? true : false, () => {
					resolve({})
				});
			}
		})
	}
	//是否可返回
	const canBack = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.canBack("", (canBack: boolean) => {
				resolve(canBack)
			})
		})
	}
	//返回上一层
	const back = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.back("", () => {
				resolve({})
			})
		})
	}
	//下一层
	const forward = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.forward("", () => {
				resolve({})
			})
		})
	}
	//上一层或下一层
	const go = (step: string) => {
		return new Promise((resolve, reject) => {
			const myStep = isNaN(parseInt(step)) ? 0 : parseInt(step)
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.go(myStep, () => {
				resolve({})
			})
		})
	}
	//重新加载当前页面
	const reload = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.reload("", () => {
				resolve({})
			})
		})
	}
	//加载url
	const loadUrl = (url: string) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.loadUrl(url, () => {
				resolve({})
			})
		})
	}
	//清除缓存
	const clear = (disk: boolean = true) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.clear(disk ? true : false, () => {
				resolve({})
			})
		})
	}
	//清除所有缓存,包含cookie和localstorage缓存
	const clearAll = (disk: boolean = true) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.clearAll(disk ? true : false, () => {
				resolve({})
			})
		})
	}
	//清除历史
	const clearHistory = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.clearHistory("", () => {
				resolve({})
			})
		})
	}
	//获取当前title
	const getTitle = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.getTitle("", (title: string) => {
				resolve(title)
			})
		})
	}
	//获取当前url
	const getUrl = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.getUrl("", (url: string) => {
				resolve(url)
			})
		})
	}
	//停止加载
	const stopLoading = () => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.stopLoading("", () => {
				resolve({})
			})
		})
	}
	//向网页发送信息|网页的回调 message:String
	const sendMessage = (message: string) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.send(message, (response: any) => {
				resolve(response)
			})
		})
	}
	//向网页注册一个handler name:string  通过onNameMessage接收
	const registerHandler = (name: string) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.registerHandler(name, () => {
				resolve({})
			})
		})
	}
	//call网页的handler
	const callHandler = (name: string, data: any) => {
		return new Promise((resolve, reject) => {
			if (mWebview.value === null) reject("初始化未完成!")
			else mWebview.value.callHandler({
				name,
				data
			}, (response) => {
				resolve(response)
			})
		})
	}
	//end

	/**
	 * 计算属性
	 */
	//窗口高度
	const viewHeight = computed(() => {
		if (typeof props.config.height === "string") {
			return props.config.height
		} else if (typeof props.config.height === "number") {
			return props.config.height + props.unit
		}
		const height = uni.getSystemInfoSync().safeArea.height + "px";
		return height;
	})
	//config
	const webConfig = computed(() => {
		//自动返回 默认是打开
		const autoBack: string = props.config.autoBack === false ? "0" : "1";
		//启用javascript 默认打开
		const javascript: string = props.config.javascript === false ? "0" : "1";
		//是否启用缓存,默认打开
		const cache: string = utils.CACHE[props.config.cache] ? utils.CACHE[props.config.cache] : "1";
		//是否启用localstorage,默认关闭
		const storage: string = props.config.storage === false ? "0" : "1";
		//是否启用database，默认关闭
		const database: string = props.config.storage === true ? "1" : "0";
		//是否启用缩放，默认关闭
		const zoom: string = props.config.zoom === false ? "0" : "1";
		//是否启用缩放放大镜工具
		const zoomControl: string = props.config.zoomControl === false ? "0" : "1";

		const config = {
			autoBack,
			cache,
			storage,
			database,
			zoom,
			zoomControl,
			javascript
		}
		return config;
	})
	//end

	/**
	 * 钩子
	 */
	onMounted(() => {
		//如果未完成
		if (!interceptTmp.complete) setInterceptPattern(interceptTmp.regs, interceptTmp.mode);
	})


	defineExpose({
		setInterceptPattern,
		getCookie,
		clearCookie,
		clearAllCookie,
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
		sendMessage,
		registerHandler,
		callHandler
	})
</script>
