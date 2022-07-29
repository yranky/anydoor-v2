<template>
	<mp-html :content="props.content" :tag-style="tagStyle" :containerStyle="containerStyle" :domain="props.domain"
		:copyLink="props.copyLink" :errorImg="props.errorImg" :lazyLoad="props.lazyLoad" :loadingImg="props.loadingImg"
		:pauseVideo="props.pauseVideo" :previewImg="props.previewImg" :scrollTable="props.scrollTable"
		:selectable="props.selectable" :showImgMenu="props.showImgMenu" :useAnchor="props.useAnchor"
		@error="emits('error')" @ready="emits('ready')" @imgtap="emits('imgtap')" @linktap="emits('linktap')"
		@load="emits('load')" @play="emits('play')">
	</mp-html>
</template>

<script setup lang="ts">
	import {
		computed
	} from "vue"
	import {
		merge
	} from "lodash"
	import {
		useTmpiniaStore
	} from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const props = defineProps({
		//富文本内容
		content: {
			type: String,
			default: ""
		},
		//标签样式
		tagStyle: {
			type: Object,
			default: () => {
				return {
					p: 'white-space:wrap !important;',
					img: 'max-width:100% !important;',

				}
			}
		},
		//自定义标签样式
		customStyle: {
			type: Object,
			default: () => {
				return {}
			}
		},
		//容器样式
		containerStyle: {
			type: String,
			default: `
			font-size: 17px; /* 设置默认的字体大小 */
			overflow: hidden; /* 禁用横向滚动 */
			display: inline; /* 行内显示 */
			white-space: pre-wrap; /* 保留空格和换行符 */
			white-space: pre-line; /* 保留换行符 */
			letter-spacing:0.8px;
			font-family:"courier,times,arial";
			line-height:28px;
			`
		},
		//自定义容器样式
		customContainerStyle: {
			type: String,
			default: ''
		},
		//域名
		domain: {
			type: String,
			default: ""
		},
		//可复制链接
		copyLink: {
			type: Boolean,
			default: false
		},
		//出错图片
		errorImg: {
			type: String,
			default: ""
		},
		//是否开启懒加载
		lazyLoad: {
			type: Boolean,
			default: true
		},
		//加载时的占位图
		loadingImg: {
			type: String,
			default: ""
		},
		//是否在播放一个视频时自动暂停其它视频
		pauseVideo: {
			type: Boolean,
			default: true
		},
		//是否开启图片预览
		previewImg: {
			type: Boolean,
			default: true
		},
		//是否给每个表格添加一个滚动层
		scrollTable: {
			type: Boolean,
			default: true
		},
		//是否开启文本长按复制
		selectable: {
			type: Boolean,
			default: true
		},
		//图片长按菜单
		showImgMenu: {
			type: Boolean,
			default: true
		},
		//是否使用锚点链接
		useAnchor: {
			type: Boolean,
			default: false
		},
		widthDark: {
			type: Boolean,
			default: true
		}
	})

	//标签样式
	const tagStyle = computed(() => {
		return merge(props.tagStyle, props.customStyle)
	})

	//容器样式
	const containerStyle = computed(() => {
		return props.containerStyle + props.widthDark ? (store.tmStore.dark ? 'color:white' : '') : '' + props
			.customContainerStyle
	})

	const emits = defineEmits(['error', 'load', 'ready', 'imgtap', 'linktap', 'play'])
</script>

<style lang="scss" scoped>

</style>
