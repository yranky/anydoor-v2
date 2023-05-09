<template>
    <view class="mprogram-info flex flex-row" @click="itemClick">
        <view class="mprogram-icon">
            <!-- 120rpx margin 20rpx 40rpx -->
            <tm-avatar :img="icon" :round="15" :size="120"></tm-avatar>
        </view>
        <view class="mprogram-detail flex-1 flex flex-col">
            <view class="mprogram-name">
                <anydoor-text :text="props.name" :fontSize="40" :lines="1" lineHeight="80" bold></anydoor-text>
            </view>
            <view class="mprogram-detail-other flex-1">
                <anydoor-text text="" :fontSize="25" :lines="1" lineHeight="40" color="grey">
                </anydoor-text>
            </view>
        </view>
        <view class="mprogram-action flex flex-col flex-center">
            <tm-icon :font-size="30" name="tmicon-angle-right" color="grey"></tm-icon>
        </view>
    </view>
</template>

<script lang="ts" setup>
import tmAvatar from "@/tmui/components/tm-avatar/tm-avatar.vue"
import anydoorText from "@/components/anydoor-text/anydoor-text.vue"
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"

const props = defineProps({
    item: {
        type: Object,
        default: () => { }
    },
    name: {
        type: String,
        default: " "
    },
    icon: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['itemClick'])

const itemClick = () => {
    emits("itemClick", props.item)
}
</script>
<style scoped lang="scss">
.mprogram-info {
    .mprogram-icon {
        margin: 20rpx 40rpx;
        width: 120rpx;
    }

    .mprogram-detail {
        margin: 20rpx 0;
    }

    .mprogram-action {
        width: 100rpx;
    }
}
</style>