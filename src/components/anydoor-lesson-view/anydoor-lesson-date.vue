<!--
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-17 17:14:37
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-14 22:57:29
 * @FilePath: \anydoor-v2\src\components\anydoor-lesson-view\anydoor-lesson-date.vue
 * @Description: 课程表日期组件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->
<template>
	<view class="lessons" :style="{
		width: (colItemWidth * colNum) + numBase,
		height: dateHeight + numBase
	}">
		<!-- 课程信息 -->
		<view class="lesson-col" :style="{
			width: colItemWidth + numBase,
			height: dateHeight + numBase
		}" v-for="item in 8" :key="item">
			<view class="lesson-item-date">
				<text class="lesson-item-date-text" :style="{
					lineHeight: dateHeight / 2 + numBase
				}">
					周一
				</text>
				<text class="lesson-item-date-text" :style="{
					lineHeight: dateHeight / 2 + numBase
				}">
					10/1
				</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import {
	toRefs
} from 'vue'
const props = defineProps({
	numBase: {
		type: String,
		default: "rpx"
	},
	colNum: {
		type: Number,
		default: 8
	},
	colItemWidth: {
		type: Number,
		default: 750 / 8
	},
	dateHeight: {
		type: Number,
		default: 80
	}
})
const {
	numBase,
	colNum,
	colItemWidth,
	dateHeight
} = toRefs<{
	numBase: string,
	colNum: number,
	colItemWidth: number,
	dateHeight: number
}>(props)
</script>

<style lang="scss" scoped>
@import "./lesson-common.scss";

.lesson-item-date {
	.lesson-item-date-text {
		font-size: 28rpx;
		text-align: center;
	}
}
</style>
