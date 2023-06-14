<template>
    <view @click="show = !show">
        <slot></slot>
    </view>
    <tm-drawer ref="calendarView" :placement="placement" v-model:show="show" okText="确定" :height="600 + keyboardHeight"
        @cancel="colorCancel" @ok="colorSure">
        <view class="color-diy" :style="{
            borderColor: colorRight ? 'transparent' : 'red'
        }">
            <anydoor-text text="自定义 #" class="flex-1" lineHeight="50" :fontSize="30" color="grey" :lines="1" bold
                style="margin:20rpx;width:fit-content;"></anydoor-text>
            <input class="color-diy-input" type="text" v-model="value" maxlength="8" placeholder="请输入16进制颜色代码" :style="{
                color: store.tmStore.dark ? '#fff' : ''
            }" />
            <view class="color-diy-show" :style="{
                background: '#' + value
            }"></view>
        </view>
        <view class="color-items">
            <view class="color-item" v-for="item in colors" :key="item" :style="{
                backgroundColor: item,
                borderColor: '#' + value.toLocaleLowerCase() === item.toLocaleLowerCase() ? primaryColor : ''
            }" @click="colorChange(item)">
            </view>
        </view>
    </tm-drawer>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
    ref
} from "vue"
import tmDrawer from "@/tmui/components/tm-drawer/tm-drawer.vue"
import { onBackPress, onHide, onShow } from "@dcloudio/uni-app"
import colors from "@/common/database/Lesson/colors"
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia"
import theme from "@/tmui/tool/theme/theme"
import anydoorText from "@/components/anydoor-text/anydoor-text.vue"
import { onUnmounted } from "vue"
import { watch } from "vue"
import { onBeforeMount } from "vue"
import { color } from "echarts"

const props = defineProps({
    color: {
        type: String,
        default: ""
    }
})

const defaultColor = ref<string>()

const emits = defineEmits(['update:color', 'colorChange'])

const store = useTmpiniaStore()

const show = ref<boolean>(false)

const value = ref<string>("4f52ff")

const placement = ref<string>("bottom")

const keyboardHeight = ref<number>(0)

//默认的文字颜色
const primaryColor = computed(() => {
    const color = theme.getColor("primary")
    // console.log(colortool.hsvaToRgba(store.tmStore.))
    return color.value
})

onBackPress(() => {
    if (show.value === true) {
        show.value = false
        return true
    }
    return false
})

//键盘高度转换
const keyboardHeightChange = (e: UniNamespace.OnKeyboardHeightChangeResult) => {
    keyboardHeight.value = uni.$tm.u.torpx(e.height || 0)
}

//颜色修改
const colorChange = (color: string) => {
    emits("update:color", color)
}

//确认修改
const colorSure = () => {
    emits("colorChange", props.color)
}

//取消修改 
const colorCancel = () => {
    emits("update:color", defaultColor.value)
}

//监听键盘事件
watch(show, () => {
    if (show.value === true) {
        defaultColor.value = props.color
        uni.onKeyboardHeightChange(keyboardHeightChange)
    } else {
        uni.offKeyboardHeightChange(keyboardHeightChange)
    }
})

//颜色值是否合法
const colorRight = computed(() => {
    if (/^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/i.test(value.value)) {
        emits("update:color", "#" + value.value)
        return true
    }
    return false
})

watch(() => props.color, () => {
    if (!props.color) return
    const colorStr: string[] = props.color.split("#")
    value.value = colorStr.length > 1 ? colorStr[1] : colorStr[0]
}, { immediate: true })
</script>

<style lang="scss" scoped>
.color-items {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 25rpx;

    .color-item {
        width: 85rpx;
        height: 85rpx;
        border-radius: 10rpx;
        border-width: 5rpx;
        border-style: solid;
        border-color: transparent;
        margin: 15rpx;
    }
}

//自定义颜色框
.color-diy {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 20rpx;
    border-width: 5rpx;
    border-style: solid;
    border-color: transparent;

    .color-diy-input {
        width: 280rpx;
        height: 50rpx;
        text-align: left;
    }

    .color-diy-show {
        width: 200rpx;
        height: 80rpx;
        border-radius: 5rpx;
        margin-right: 5rpx;
    }
}
</style>
