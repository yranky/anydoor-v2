<!--
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-28 07:24:55
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-15 10:29:16
 * @FilePath: \anydoor-v2\src\components\anydoor-page\anydoor-page.vue
 * @Description: page
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->

<template>
	<view>
		<view id="slotNavBar">
			<slot name="navBar"></slot>
		</view>
		<list :bounce="true" :style="{
			height: listHeight
		}">
			<refresh @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
				<!-- <div>
					<text class="loading-text">{{refreshText}}</text>
				</div> -->
				<anydoorPullLoading :marginTop="navBarHeight" unit="px" />
			</refresh>
			<cell>
				<slot name="content"></slot>
			</cell>
		</list>
	</view>
</template>

<script lang="ts" setup>
import anydoorPullLoading from "@/components/anydoor-pull-loading/anydoor-pull-loading.vue"
import {
	onShow
} from "@dcloudio/uni-app";
import {
	ref,
	onMounted,
	getCurrentInstance,
	nextTick
} from "vue"



//正在加载
const refreshing = ref<boolean>(false)
//加载显示的文字
const refreshText = ref<string>()

const onrefresh = () => {
	console.log(111)
	refreshing.value = true
	refreshText.value = "刷新中..."
	setTimeout(() => {
		refreshing.value = false
		refreshText.value = "已刷新"
	}, 2000)
}

const onpullingdown = (e) => {
	console.log(e)
	if (refreshing.value) return

	if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
		refreshText.value = "释放立即刷新"
	} else {
		refreshText.value = "下拉可以刷新"
	}
}

onMounted(() => {
	nextTick(() => {
		setListHeight()
	})
})

onShow(() => {
	nextTick(() => {
		setListHeight()
	})
})

const navBarHeight = ref<number>(0)

//列表高度
const listHeight = ref<string>('100vh')
const setListHeight = (): void => {
	try {
		const query = uni.createSelectorQuery().in(getCurrentInstance())
		query.select("#slotNavBar").boundingClientRect((data: any) => {
			const windowHeight = uni.getSystemInfoSync().windowHeight
			navBarHeight.value = data.height
			listHeight.value = (windowHeight - data.height) + 'px'
		}).exec()
	} catch (e) {

	}
}
</script>

<style lang="scss" scoped>

</style>
