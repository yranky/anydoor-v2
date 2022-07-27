<template>
	<view class="lesson-item flex flex-nowrap flex-row">
		<view class="lesson-time">
			<anydoor-text :text="props.time" :lines="3" color="grey" :fontSize="30"></anydoor-text>
		</view>
		<view class="lesson-dot" :style="{
			backgroundColor:props.dotColor
		}"></view>
		<view class="lesson-detail flex-1 flex flex-col">
			<view class="lesson-name">
				<anydoor-text :fontSize="35" bold :lines="1" :text="props.lessonName"></anydoor-text>
			</view>
			<view class="lesson-room">
				<anydoor-text :text="props.lessonRoom" color="grey" :fontSize="30" :lines="1"></anydoor-text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const props = defineProps({
		time: {
			type: [String, Number],
			default: " "
		},
		dotColor: {
			type: String,
			default: "#40a9ff"
		},
		lessonName: {
			type: String,
			default: " "
		},
		lessonRoom: {
			type: String,
			default: " "
		}
	});
</script>

<style lang="scss" scoped>
	.lesson-item {
		margin: 20rpx;

		.lesson-time {
			width: 100rpx;
		}

		.lesson-dot {
			width: 15rpx;
			height: 15rpx;
			background-color: red;
			border-radius: 100%;
			margin: 20rpx 20rpx;
		}

		.lesson-detail {
			.lesson-name {
				margin: 0 0 5rpx 0;
			}

			.lesson-room {
				margin: 5rpx 0 5rpx 0;
			}
		}
	}
</style>
