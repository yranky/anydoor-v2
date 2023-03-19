<!--
 * @Author: yranky douye@douye.top
 * @Date: 2022-07-28 07:24:55
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-18 17:01:06
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
		}" @loadmore="loadmore" ref="slotPageList">
			<refresh @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
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
	onReady,
	onShow
} from "@dcloudio/uni-app";
import { watch } from "vue";
import {
	ref,
	onMounted,
	getCurrentInstance,
	nextTick
} from "vue"

const props = defineProps({
	refreshComplete: {
		type: Boolean,
		default: true
	}
})


//正在加载
const refreshing = ref<boolean>(false)
//加载显示的文字
const refreshText = ref<string>()

const emits = defineEmits(["update:refreshComplete", 'refresh', 'loadmore'])

//监听刷新完成
watch(() => props.refreshComplete, (newValue) => {
	if (newValue === true) {
		refreshing.value = false
	}
})

//加载更多
const loadmore = () => {
	emits("loadmore")
	//重置
	resetLoadMore()
}

const slotPageList = ref<any>(null)
//重置loadmore
const resetLoadMore = () => {
	console.log(slotPageList)
	slotPageList.value && slotPageList.value.resetLoadmore()
}

const onrefresh = () => {
	//上报刷新中
	emits("refresh")
	emits("update:refreshComplete", false)
	refreshing.value = true
	refreshText.value = "刷新中..."
}

const onpullingdown = (e: any) => {
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
		setTimeout(setListHeight, 100)
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
			// console.log(uni.getSystemInfoSync(),windowHeight, data.height)
			listHeight.value = (windowHeight - data.height) + 'px'
		}).exec()
	} catch (e) {

	}
}
</script>

<style lang="scss" scoped></style>
