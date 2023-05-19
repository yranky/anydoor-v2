<!--
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-17 17:14:37
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-19 23:45:08
 * @FilePath: \anydoor-v2\src\components\anydoor-lesson-view\anydoor-lesson-view.vue
 * @Description: 课程表组件
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->
<template>
	<!-- 课程表主体部分 -->
	<view class="lessons" :style="{
		width: (colItemWidth * colNum) + numBase,
		height: (rowNum * rowItemHeight) + numBase
	}">
		<!-- 第一列,节次信息 -->
		<view class="lesson-col" :style="{
			width: colItemWidth + numBase,
			height: (rowNum * rowItemHeight) + numBase
		}">
			<view v-for="(item, index) in rowNum" :style="{
				height: rowItemHeight + numBase
			}">
				<AnydoorText :text="item + ''" style="text-align: center;" />
			</view>
		</view>
		<!-- 课程信息 -->
		<view v-for="(item, index) in lessonData" :key="index" class="lesson-col" :style="{
			width: colItemWidth + numBase,
			height: (rowNum * rowItemHeight) + numBase
		}">
			<view v-for="lesson in item" :key="JSON.stringify(lesson)" class="lesson-item" :style="{
				'top': (rowItemHeight * (lesson.time[0] - 1) - 6) + numBase,
				'height': (rowItemHeight * (lesson.time[1] - lesson.time[0] + 1) - 6) + numBase,
				'backgroundColor': lesson.color
			}">
				<anydoor-native-scroll :style="{
					width: colItemWidth + numBase,
					height: (rowItemHeight * (lesson.time[1] - lesson.time[0] + 1) - 6) + numBase
				}" :text="lesson.name + lesson.position" />
				<!-- <text class="lesson-item-text">
					{{ lesson.name }}
				</text>
				<text class="lesson-item-text">
					{{ lesson.position }}</text> -->
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import {
	computed,
	toRefs
} from 'vue'
import IAnydoorLesson from './IAnydoorLesson'
import AnydoorText from '../anydoor-text/anydoor-text.vue'
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
	rowNum: {
		type: Number,
		default: 10
	},
	rowItemHeight: {
		type: Number,
		default: 150
	},
	lessons: {
		type: Array,
		default: () => []
	}
})
const {
	numBase,
	colNum,
	colItemWidth,
	rowNum,
	rowItemHeight,
	lessons
} = toRefs<{
	lessons: IAnydoorLesson[],
	numBase: string,
	colNum: number,
	colItemWidth: number,
	rowNum: number,
	rowItemHeight: number
}>(props)


//分好类的课程数据
const lessonData = computed((val: IAnydoorLesson[]): IAnydoorLesson[][] => {
	const arr: IAnydoorLesson[][] = new Array(7).fill(0).map(() => [])
	// 解析lessons
	lessons.value.forEach((item: IAnydoorLesson) => {
		if (arr[item.week == 7 ? 0 : item.week] instanceof Array) arr[item.week == 7 ? 0 : item.week].push(item)
	})
	return arr
})
</script>

<style lang="scss" scoped>
@import "./lesson-common.scss"
</style>
