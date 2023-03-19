<!--
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-18 16:27:06
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-18 17:08:48
 * @FilePath: \anydoor-v2\src\components\anydoor-loadmore\anydoor-loadmore.vue
 * @Description: 加载更多
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->
<template>
    <view class="anydoor-loadmore-item" @click="loadmore">
        <tm-icon name="tmicon-shuaxin" :spin="true" v-if="props.status === ANYDOOR_LOADMORE_STATUS.LOADING"></tm-icon>
        <anydoor-text class="flex-2" :text="loadMoreText" :fontSize="25" lineHeight="50" color="grey" :lines="1"
            style="margin:0 20rpx;text-align: center;" />
    </view>
</template>
<script lang="ts" setup>
import anydoorText from "@/components/anydoor-text/anydoor-text.vue"
import { ref, watch } from "vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"
import ANYDOOR_LOADMORE_STATUS from "./IAnydoorLoadmore"
const props = defineProps({
    status: {
        type: Number,
        default: ANYDOOR_LOADMORE_STATUS.MORE
    },
})
//加载更多
const loadMoreText = ref<string>("加载更多")

const emits = defineEmits(['loadmore'])
//加载更多
const loadmore = () => {
    emits("loadmore")
}

watch(() => props.status, (newVal) => {
    if (newVal === ANYDOOR_LOADMORE_STATUS.MORE) loadMoreText.value = "加载更多"
    if (newVal === ANYDOOR_LOADMORE_STATUS.LOADING) loadMoreText.value = "加载中..."
    if (newVal === ANYDOOR_LOADMORE_STATUS.NOMORE) loadMoreText.value = "没有更多了"
})

</script>
<style scoped lang="scss">
.anydoor-loadmore-item {
    padding: 20rpx 0 50rpx 0;
}
</style>