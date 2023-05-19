<!--
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-17 17:14:37
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-19 23:56:21
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
					{{ weekMapper[item - 1] }}
				</text>
				<text class="lesson-item-date-text" :style="{
					lineHeight: dateHeight / 2 + numBase
				}">
					{{ weekDaysMapper[item - 1] }}
				</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs'
import { ref, watch } from 'vue'
import weekday from "dayjs/plugin/weekday"
import {
	toRefs
} from 'vue'
import { useLessonStore } from '@/store/lesson'
dayjs.extend(weekday)

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
	},
	//当前的周次
	currentWeeks: {
		type: Number,
		default: 0
	},
	//当前展示的周次
	currentShowWeeks: {
		type: Number,
		default: 0
	}
})
const {
	numBase,
	colNum,
	colItemWidth,
	dateHeight,
	currentWeeks,
	currentShowWeeks
} = toRefs<{
	numBase: string,
	colNum: number,
	colItemWidth: number,
	dateHeight: number,
	currentWeeks: number,
	currentShowWeeks: number
}>(props)


const weekMapper = ['', '周日', '周一', '周二', '周三', '周四', '周五', '周六']
const weekDaysMapper = ref<string[]>(['', '', '', '', '', '', '', ''])
const lessonStore = useLessonStore()
const updateWeekDayMapper = () => {
	//获取当前展示的周次
	const showWeek: number = currentShowWeeks.value
	//获取当前周次
	const currentWeek: number = currentWeeks.value
	const weekFirstDay = lessonStore.weekFirstDay
	//获取星期天
	const currentWeekFirstDay: Dayjs = dayjs().weekday(weekFirstDay)
	
	for (let i = 1; i < weekDaysMapper.value.length; i++) {
		weekDaysMapper.value[i] = currentWeekFirstDay.add((showWeek - currentWeek) * 7 + i - 1, 'day').format("MM/DD")
	}
	// console.log(weekDaysMapper.value)

}

watch(() => props.currentShowWeeks, updateWeekDayMapper, { immediate: true, deep: true })

watch(() => props.currentWeeks, updateWeekDayMapper, { immediate: true, deep: true })
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
