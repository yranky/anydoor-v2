<template>
	<tm-translate v-if="timerEnd">
		<slot></slot>
	</tm-translate>
</template>

<script setup lang="ts">
	import {
		onMounted,
		ref
	} from "vue"
	import tmTranslate from "@/tmui/components/tm-translate/tm-translate.vue"
	const props = defineProps({
		"time": {
			type: Number,
			default: 200
		}
	})
	
	const emits=defineEmits(['complete'])

	const timerEnd = ref(false)
	onMounted(() => {
		setTimeout(() => {
			timerEnd.value = true
			emits("complete")
		}, props.time)
	})
</script>

<style lang="scss" scoped>

</style>
