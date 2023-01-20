<!--
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-17 17:14:37
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-01-19 13:50:28
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

		</view>
		<!-- 课程信息 -->
		<view v-for="(item, index) in lessonData" :key="index" class="lesson-col" :style="{
			width: colItemWidth + numBase,
			height: (rowNum * rowItemHeight) + numBase
		}">
			<view v-for="lesson in item" :key="index + lesson.time.join(' ')" class="lesson-item" :style="{
				'top': (rowItemHeight * (lesson.time[0] - 1)) + numBase,
				'height': (rowItemHeight * (lesson.time[1] - lesson.time[0] + 1)) + numBase
			}">
				<text>
					{{ rowNum * rowItemHeight }}
					这里可以看到，即使我们仅添加name到数组的第一个值，两个对象也具有相同的名称。
					因为Array.fill通过引用填充值。因此，如果更改一个值，则所有值都将更改。
				</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {
		computed,
		toRefs,
		withDefaults
	} from 'vue'
	import IAnydoorLesson from './IAnydoorLesson'
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
	} = toRefs < {
		lessons: IAnydoorLesson[],
		numBase: string,
		colNum: number,
		colItemWidth: number,
		rowNum: number,
		rowItemHeight: number
	} > (props)


	//分好类的课程数据
	const lessonData = computed((val: IAnydoorLesson[]): IAnydoorLesson[][] => {
		const arr: IAnydoorLesson[][] = new Array(7).fill(0).map(() => [])
		// 解析lessons
		lessons.value.forEach((item: IAnydoorLesson) => {
			if (arr[item.week] instanceof Array) arr[item.week].push(item)
		})
		return arr
	})
</script>

<style lang="scss" scoped>
	.lessons {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: blue;

		.lesson-col {
			position: relative;
			flex-shrink: 0;
			flex-grow: 0;
		}

		.lesson-item {
			position: absolute;
			left: 0;
			right: 0;
			background-color: red;
		}
	}
</style>
