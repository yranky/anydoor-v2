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
	import Context from 'android.content.Context'
	import VideoViewManager from "xyz.doikki.videoplayer.player.VideoViewManager"
	import VideoViewConfig from "xyz.doikki.videoplayer.player.VideoViewConfig"
	import IjkPlayerFactory from "xyz.doikki.videoplayer.ijk.IjkPlayerFactory"
	import Handler from "android.os.Handler"
	import Looper from "android.os.Looper"
	import Runnable from 'java.lang.Runnable'

	let videoViewObj : VideoView | null = null
	let standardVideoControllerObj : StandardVideoController | null = null

	//视频返回
	class BackUIRunnable implements Runnable {
		override run() : void {
			videoViewObj?.onBackPressed()
		}
	}

	//返回
	class OnBackUIRunnable implements Runnable {
		comp : UTSComponent<LinearLayout>
		canBack : Boolean
		constructor(com : UTSComponent<LinearLayout>, canBack : Boolean) {
			this.comp = com
			this.canBack = canBack
		}
		override run() : void {
			this.comp.$emit("onback", this.canBack)
		}
	}

	export default {
		name: "anydoor-video",
		data() {
			return {
			}
		},
		props: {
			"title": {
				type: String,
				default: ""
			},
			"live": {
				type: Boolean,
				default: true
			},
			"src": {
				type: String,
				default: ""
			}
		},
		expose: ["onBackPressed", "back"],
		emits: ['onback'],
		methods: {
			onBackPressed() : void {
				const handler : Handler = new Handler(Looper.getMainLooper());
				handler.post(new BackUIRunnable());
			},
			back() : void {
				const canBack = !videoViewObj!.isFullScreen() && !standardVideoControllerObj!.isLocked()
				const handler : Handler = new Handler(Looper.getMainLooper())
				handler.post(new OnBackUIRunnable(this,canBack))

			}
		},
		watch: {
			"src": {
				handler(newPath : string) {
					videoViewObj?.setUrl(newPath)
					videoViewObj?.start()
				},
				immediate: true
			},
			"live": {
				handler(live : Boolean) {
					standardVideoControllerObj?.addDefaultControlComponent(this.title, live ? true : false)
				}
			},
			"title": {
				handler(title : String) {
					standardVideoControllerObj?.addDefaultControlComponent(title, this.live ? true : false)
				}
			}
		},
		NVLoaded() {
			const standardVideoController : StandardVideoController = new StandardVideoController(this.$androidContext)
			standardVideoControllerObj = standardVideoController
			standardVideoController.addDefaultControlComponent(this.title, this.live ? true : false)
			videoViewObj?.setVideoController(standardVideoController)
		},
		NVLoad() : LinearLayout {
			VideoViewManager.setConfig(VideoViewConfig.newBuilder().setPlayerFactory(new IjkPlayerFactory()).build())
			//必须实现  
			let linearLayout = new LinearLayout(this.$androidContext)
			const videoView : VideoView = new VideoView(this.$androidContext)
			videoView.setTag("video")
			linearLayout.addView(videoView, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT))
			videoViewObj = videoView
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