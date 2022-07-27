<template>
	<view class="news-item">
		<view class="skeleton-item flex flex-row  flex-nowrap" v-if="props.skeleton">
			<view class="flex-1 flex flex-col" style="margin-left: 20rpx;">
				<tm-skeleton-line :height="50"></tm-skeleton-line>
				<tm-skeleton-line :height="50"></tm-skeleton-line>
			</view>
			<view style="width:200rpx;margin-left: 20rpx;">
				<tm-skeleton-line :width="200" :height="133.333"></tm-skeleton-line>
			</view>
		</view>
		<!-- 视频 -->
		<view class="news-video flex flex-center" style="margin: 10rpx 0;" v-if="!(video==='')&&!props.skeleton">
			<video style="width: 600rpx;height:337.5rpx;" :src="props.video"></video>
		</view>
		<!-- 图文 -->
		<view class="flex flex-row flex-nowrap" v-if="!props.skeleton">
			<view class="news-detail flex-1 flex flex-col">
				<view class="news-title flex-1">
					<anydoor-text :text="props.title" :lines="props.img===''||!(props.video==='')?1:2" :style="{
						[props.titleColor===''?'':'color']:props.titleColor
					}"></anydoor-text>
				</view>
				<view class="news-info flex flex-row flex-start flex-nowrap">
					<anydoor-text color="grey" :fontSize="23" margin="0 20rpx 0 0" class="news-info-item flex-1"
						:text="infoText" :lines="1">
					</anydoor-text>
					<slot name="moreInfo"></slot>
				</view>
			</view>
			<view class="news-img" v-if="!(props.img==='')">
				<tm-image :width="200" :height="133.333" :src="props.img"></tm-image>
			</view>
		</view>

		<tm-divider color="grey" v-if="!props.skeleton"></tm-divider>
	</view>
</template>

<script lang="ts" setup>
	import tmImage from "@/tmui/components/tm-image/tm-image.vue"
	import anydoorText from "@/components/anydoor-text/anydoor-text.vue"
	import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue"
	import tmSkeletonLine from "@/tmui/components/tm-skeleton-line/tm-skeleton-line.vue"
	import {
		computed
	} from "vue"
	const props = defineProps({
		title: {
			type: String,
			default: " "
		},
		titleColor: {
			type: String,
			default: ""
		},
		infoList: {
			type: Array,
			default: () => []
		},
		img: {
			type: String,
			default: ''
		},
		video: {
			type: String,
			default: ''
		},
		//骨架屏
		skeleton: {
			type: Boolean,
			default: false
		}
	});

	const infoText = computed(() => {
		if (props.infoList instanceof Array) {
			return props.infoList.join(" ")
		} else if (typeof props.infoList === 'string') {
			return props.infoList
		}
		return ""
	})
</script>

<style lang="scss" scoped>
	.news-item {
		margin: 20rpx;

		.news-detail {
			margin: 0 20rpx;

			.news-info {
				.news-info-item {}
			}
		}
	}
</style>
