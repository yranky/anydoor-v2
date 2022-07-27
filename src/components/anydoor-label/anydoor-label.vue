<template>
	<view class="label" :style="{
		margin:margin
	}">
		<view class="label-rect" :style="{
			backgroundColor:rectColor,
			width:rectSize,
			height:lineHeight
		}"></view>
		<anydoor-text class="label-text flex-1" :fontSize="fontSize" :lineHeight="props.lineHeight" :text="labelText"
			:style="{
				fontWeight:'bold',
				margin:labelMargin
			}" :unit="props.unit"></anydoor-text>
		<view class="label-action">
			<slot name="action">
				<view class="label-action-item" @click="emits('click', $event)">
					<anydoor-text :fontSize="actionFontSize" :text="props.actionItem" color="grey"
						:lineHeight="props.lineHeight" :style="{margin:'0 5rpx'}" :unit="props.unit"></anydoor-text>
					<tm-icon name="tmicon-angle-right" color="grey" :fontSize="actionFontSize-3"></tm-icon>
				</view>
			</slot>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {
		computed,
		getCurrentInstance,
		inject,
		ref,
		VNode
	} from "vue";
	import {
		useTmpiniaStore
	} from '@/tmui/tool/lib/tmpinia'
	import {
		custom_props,
		computedTheme,
		computedClass,
		computedStyle,
		computedDark,
	} from "@/tmui/tool/lib/minxs";
	import {
		tmVuetify,
		colorThemeType
	} from "@/tmui/tool/lib/interface";
	import theme from "@/tmui/tool/theme/theme";
	import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"
	//store
	const store = useTmpiniaStore()


	const props = defineProps({
		...custom_props,
		label: {
			type: [String, Number],
			default: ""
		},
		fontSize: {
			type: [Number],
			default: 32
		},
		color: {
			type: String,
			default: ""
		},
		unit: {
			type: String,
			default: 'rpx'
		},
		lineHeight: {
			type: String,
			default: "50"
		},
		labelText: {
			type: String,
			default: ""
		},
		margin: {
			type: Array,
			default: [0, 0, 0, 0]
		},
		labelMargin: {
			type: Array,
			default: [0, 5, 0, 5]
		},
		rectColor: {
			type: String,
			default: ""
		},
		rectSize: {
			type: Number,
			default: 12
		},
		actionItem: {
			type: String,
			default: "更多"
		},
		actionFontSize: {
			type: Number,
			default: 25
		}
	});


	const emits = defineEmits(["click"]);

	//行高
	const lineHeight = computed(() => {
		if (props.lineHeight === undefined) {
			return (props._fontSize ? props._fontSize * 1.3 : 42) + props.unit
		} else {
			return props.lineHeight + props.unit
		}
	})


	const margin = computed(() => {
		if (props.margin.length === 2 || props.margin.length === 4) {
			return props.margin.join(props.unit + " ") + props.unit
		}
		return ""
	})

	const labelMargin = computed(() => {
		if (props.labelMargin.length === 2 || props.labelMargin.length === 4) {
			return props.labelMargin.join(props.unit + " ") + props.unit
		}
		return ""
	})

	const rectSize = computed(() => {
		return props.rectSize + props.unit
	})



	// 设置响应式全局组件库配置表。
	const tmcfg = computed < tmVuetify > (() => store.tmStore);
	//自定义样式：
	const customCSSStyle = computed(() => computedStyle(props));
	//自定类
	const customClass = computed(() => computedClass(props));
	//是否暗黑模式。
	const isDark = computed(() => computedDark(props, tmcfg.value));
	//计算主题
	// const tmcomputed = computed(() => computedTheme(props, isDark.value));
	const _label = computed(() => props.label)
	const _fontSize = computed(() => Number(props.fontSize))
	//从父应用组件中获取自动文字色。
	const appTextColor = inject("appTextColor", computed(() => undefined));

	//方块颜色
	const rectColor = computed(() => {
		if (props.followTheme && store.tmStore.color) return store.tmStore.color;
		let isColorHex = theme.isCssColor(props.rectColor);
		//如果当前是自定义颜色值，直接返回。
		if (isColorHex) return props.rectColor;

		//如果定义了颜色，但不是值，而是主题色，则返回对应的主题文本色。
		if (props.rectColor && !isColorHex) {
			let nowcolor: colorThemeType = theme.getColor(props.rectColor);
			return nowcolor.csscolor;
		}
		if (!appTextColor) {
			if (isDark) return 'rgba(252, 252, 252, 1.0)'
			return 'rgba(34, 34, 34, 1.0)'
		}
		if (appTextColor.value) {
			return appTextColor.value
		};
		return 'rgba(34, 34, 34, 1.0)';
	});

	const textColor = computed(() => {
		if (props.followTheme && store.tmStore.color) return store.tmStore.color;
		let isColorHex = theme.isCssColor(props.color);
		//如果当前是自定义颜色值，直接返回。
		if (isColorHex) return props.color;

		//如果定义了颜色，但不是值，而是主题色，则返回对应的主题文本色。
		if (props.color && !isColorHex) {
			let nowcolor: colorThemeType = theme.getColor(props.color);
			return nowcolor.csscolor;
		}
		if (!appTextColor) {
			if (isDark) return 'rgba(252, 252, 252, 1.0)'
			return 'rgba(34, 34, 34, 1.0)'
		}
		if (appTextColor.value) {
			return appTextColor.value
		};
		return 'rgba(34, 34, 34, 1.0)';
	});
</script>

<style lang="scss" scoped>
	.label {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;

		.label-rect {
			width: 13rpx;
			height: 50rpx;
			background-color: blue;
			border-radius: 6.5rpx;
			margin: 0 10rpx;
		}

		.label-text {
			overflow: hidden;
			/* #ifdef APP-NVUE */
			word-break: break-all;
			/* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;
			/* 超出部分省略号 */
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 1;
			/** 显示的行数 **/
			lines: 1;
			/* #endif */
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}

		.label-action {
			width: 200rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin: 0 20rpx;

			.label-action-item {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
			}
		}
	}
</style>
