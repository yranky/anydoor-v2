<template>
	<text @click="emits('click', $event)" :class="[_fontSize ? '' : 'text-size-m', customClass]" :style="[
        {
          lineHeight:lineHeight,
		   color: textColor,
		   lines:props.lines,
		   textOverflow:'ellipsis',
		   overflow:'hidden',
		   fontWeight:props.bold?'bold':'',
		   margin:props.margin
        },
        _fontSize ? { fontSize: _fontSize + props.unit } : '',
        customCSSStyle
      ]">
		{{text}}
	</text>
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
			default: 28
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
			default: undefined
		},
		text: {
			type: String,
			default: ""
		},
		lines: {
			type: Number,
			default: undefined
		},
		bold:{
			type:Boolean,
			default:false
		},
		margin:{
			type:String,
			default:"0 0"
		}
	});

	//行高
	const lineHeight = computed(() => {
		if (props.lineHeight === undefined) {
			return (props._fontSize ? props._fontSize * 1.3 : 42) + props.unit
		} else {
			return props.lineHeight + props.unit
		}
	})



	const emits = defineEmits(["click"]);

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

</style>
