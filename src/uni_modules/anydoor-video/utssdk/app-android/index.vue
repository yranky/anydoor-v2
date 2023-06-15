<template>
	<view class="video-box"></view>
</template>
<script lang="uts">
	import VideoView from "xyz.doikki.videoplayer.player.VideoView"
	import LinearLayout from 'android.widget.LinearLayout'
	import { UTSAndroid } from "io.dcloud.uts"
	import Application from 'android.app.Application'
	import ViewGroup from 'android.view.ViewGroup'
	import StandardVideoController from 'xyz.doikki.videocontroller.StandardVideoController'
	import ActivityInfo from 'android.content.pm.ActivityInfo'
	import Activity from 'android.app.Activity'

	export default {
		name: "anydoor-video",
		data() {
			return {
			}
		},
		props: {
			"src": {
				type: String,
				default: ""
			}
		},
		watch: {
			"src": {
				handler(newPath : string) {
					if (this.$el != null) {
						const videoView = this.$el!.findViewWithTag("video") as VideoView
						videoView.setUrl(newPath)
						const standardVideoController : StandardVideoController = new StandardVideoController(this.$androidContext);
						standardVideoController.addDefaultControlComponent("标题", false);
						videoView.setVideoController(standardVideoController);
						videoView.start()
					}
				},
				immediate: true
			},
		},
		NVLoad() : LinearLayout {
			//必须实现  
			let linearLayout = new LinearLayout(this.$androidContext)
			const videoView : VideoView = new VideoView(this.$androidContext)
			videoView.setTag("video")
			linearLayout.addView(videoView, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT))
			return linearLayout
		},
		/**
		 * 原生View将释放  
		 * [可选实现]
		 */
		NVBeforeUnload() {
			if (this.$el != null) {
				const videoView = this.$el!.findViewWithTag("video") as VideoView
				videoView.release()
			}
		},
	}
</script>
<style scoped>
	.video-box {
		width: 750rpx;
		height: 240rpx;
	}
</style>