<template>
	<list :alwaysScrollableVertical="true" :enableBackToTop="true" scroll-y loadmoreoffset="15">
		<refresh>
			<div class="refresh-view">
				<text>下拉加载</text>
			</div>
		</refresh>
		<cell>
			<slot></slot>
		</cell>
	</list>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>
