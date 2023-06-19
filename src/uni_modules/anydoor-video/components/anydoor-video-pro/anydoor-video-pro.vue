<template>
	<anydoor-video ref="anydoorVideo" :src="props.src" :live="props.live" :title="props.title"
		@onback="onBack"></anydoor-video>
</template>

<script lang="ts" setup>
	import { onBackPress } from "@dcloudio/uni-app"
	import { ref } from "vue"

	const anydoorVideo = ref(null)

	const props = defineProps({
		src: {
			type: String,
			default: ""
		},
		live: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ""
		}
	})

	const isCanBack = ref<boolean>(false)

	const onBack = (canBack : boolean) => {
		if (canBack.detail === true) {
			isCanBack.value = true
			uni.navigateBack()
		}
	}
	onBackPress(() => {
		if (anydoorVideo.value && !isCanBack.value) {
			anydoorVideo.value.onBackPressed()
			anydoorVideo.value.back()
			return true
		}
		return false
	})
</script>