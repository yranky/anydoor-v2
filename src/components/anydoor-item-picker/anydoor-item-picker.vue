<template>
    <view @click="show = !show">
        <slot></slot>
    </view>
    <tm-drawer ref="calendarView" :placement="placement" v-model:show="show" okText="确定" :height="600 + keyboardHeight"
        @cancel="itemCancel" @ok="itemSure">
        <template #title>
            <tm-input v-if="props.showInput" placeholder="请输入自定义" :width="300"></tm-input>
        </template>
        <tm-result :showBtn="false" v-if="!listItems || listItems.length === 0" title="暂无内容"
            :subTitle="props.showInput ? '请在上方输入框输入内容' : ' '"></tm-result>
        <view class="picker-box" :style="{
            margin: config[styleConfig].boxMargin,
            padding: config[styleConfig].boxPadding
        }">
            <view :style="{
                margin: config[styleConfig].margin,
                width: config[styleConfig].width,
                height: props.square ? config[styleConfig].width : config[styleConfig].height,
                border: `5rpx solid ${checked.includes(item.value) ? primaryColor : primaryAColor}`,
                backgroundColor: `${checked.includes(item.value) ? primaryColor : 'transparent'}`
            }" class="picker-box-item" v-for="item in listItems" :key="item.value" @click="checkItem(item)">
                <slot name="item" :config="config[styleConfig]">
                    <anydoor-text :style="{
                        padding: config[styleConfig].padding,
                        width: config[styleConfig].width,
                        textAlign: props.textCenter ? 'center' : 'left'
                    }" :text="item.label + ''" :color="checked.includes(item.value) ? '#fff' : primaryAColor"
                        :lines="1" :lineHeight="props.square ? config[styleConfig].width : config[styleConfig].height" />
                </slot>
            </view>
        </view>
    </tm-drawer>
</template>

<script setup lang="ts">
import {
    Ref,
    computed,
    inject,
    ref
} from "vue"
import tmDrawer from "@/tmui/components/tm-drawer/tm-drawer.vue"
import { watch } from "vue"
import { Ilist, IConfig, CONFIG_TYPE, config, IListArray } from "./anydoor-item-picker"
import anydoorText from "../anydoor-text/anydoor-text.vue"
import theme from "@/tmui/tool/theme/theme"
import tmInput from "@/tmui/components/tm-input/tm-input.vue"
import tmResult from "@/tmui/components/tm-result/tm-result.vue"
import { cloneDeep, isUndefined } from "lodash"


const props = withDefaults(defineProps<{
    //值
    value: string | number | string[] | number[],
    //列表
    list: Ilist[],
    //个数的配置
    styleConfig: CONFIG_TYPE,
    //正方形
    square: boolean,
    //显示输入框
    showInput: boolean,
    //文字居中
    textCenter: boolean
}>(), {
    value: '',
    styleConfig: CONFIG_TYPE.ONE,
    square: false,
    showInput: false,
    textCenter: true
})

const emits = defineEmits(['update:value', 'valueChange'])

const defaultValue = ref<string | number | string[] | number[]>()

const show = ref<boolean>(false)

const placement = ref<string>("bottom")

const keyboardHeight = ref<number>(0)



//列表项
const listItems = computed<IListArray[]>(() => {
    console.log(props.list)
    if (!props.list || props.list.length === 0) return []
    //处理需要渲染的数据
    return props.list.map((item: Ilist) => {
        if (typeof item === "string" || typeof item === "number") return {
            label: item,
            value: item
        }
        else return {
            label: item.label,
            value: item.value
        }
    })
})

//选中的
const checked = computed(() => {
    if (isUndefined(props.value)) return []
    if (typeof props.value === "string" || typeof props.value === "number") return [props.value]
    else return props.value
})

//选中事件
const checkItem = (item: IListArray) => {
    //判断有没有选中
    const index = checked.value.findIndex(checkedItem => checkedItem === item.value)
    //多选
    if (props.value instanceof Array) {
        //之前未选中
        if (index < 0) {
            emits("update:value", [...props.value, item.value])
        } else {
            //之前已选中
            const item = cloneDeep(checked.value)
            item.splice(index, 1)
            emits("update:value", item)
        }
    } else {
        //单选
        emits("update:value", index < 0 ? item.value : "")
    }
}



//默认的背景颜色
const primaryColor = computed(() => {
    const color = theme.getColor("primary")
    // console.log(colortool.hsvaToRgba(store.tmStore.))
    return color.value
})

//默认的背景颜色的减淡版
const primaryAColor = computed(() => {
    const color = theme.getColor("primary")
    return `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},.8)`
})


//确认修改
const itemSure = () => {
    emits("valueChange", props.value)
}

//取消修改 
const itemCancel = () => {
    emits("update:value", defaultValue.value)
}

//键盘高度转换
const keyboardHeightChange = (e: UniNamespace.OnKeyboardHeightChangeResult) => {
    keyboardHeight.value = uni.$tm.u.torpx(e.height || 0)
}


const setDisItemPickerBack = inject<Function>('setDisItemPickerBack')
const disItemPickerBack = inject<Ref<boolean>>('disItemPickerBack')


watch(() => disItemPickerBack, () => {
    //判断是否为阻止返回
    if (disItemPickerBack?.value === false) {
        show.value = false
    }
}, { deep: true })


//监听键盘事件
watch(show, () => {
    if (show.value === true) {
        defaultValue.value = props.value
        uni.onKeyboardHeightChange(keyboardHeightChange)
        //阻止返回
        setDisItemPickerBack && setDisItemPickerBack(true)
    } else {
        uni.offKeyboardHeightChange(keyboardHeightChange)
        //允许返回
        setDisItemPickerBack && setDisItemPickerBack(false)
    }
})



</script>

<style lang="scss" scoped>
.picker-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    .picker-box-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 10rpx;
    }
}
</style>
