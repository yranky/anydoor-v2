<template>
    <view>
        <anydoor-native-lottie :style="{
            width: props.width,
            height: props.height
        }" :url="props.url" :localPath="props.localPath" :loop="props.loop" ref="mLottie" @on-error="onError"
            @on-start="onStart" @on-end="onEnd" @on-cancel="onCancel" @on-repeat="onRepeat" @on-pause="onPause"
            @on-resume="onResume" @on-update="onUpdate" />
    </view>
</template>

<script lang="ts" setup>
import {
    ref
} from "vue"
import { IAnydoorEventResult } from "../webview/IAnydoorWebview";
import { IAnydoorLottieRef, ILottieDetailResult, ILottieOnErrorResult, ILottieOnUpdateResult } from "./IAnydoorLottie";


const props = withDefaults(defineProps<{
    localPath?: string,
    url?: string,
    loop?: boolean,
    width?: string,
    height?: string
}>(), {
    loop: true,
    width: "750rpx",
    height: "100rpx"
})

const emits = defineEmits([
    'onError', 'onStart', 'onEnd', 'onCancel', 'onRepeat', 'onPause', 'onResume', 'onUpdate'
])

const mLottie = ref<IAnydoorLottieRef>()

//错误
const onError = (res: IAnydoorEventResult<ILottieOnErrorResult>) => {
    emits("onError", res.detail)
}
//开始
const onStart = (res: IAnydoorEventResult<undefined>) => {
    emits("onStart", res.detail)
}
//结束
const onEnd = (res: IAnydoorEventResult<undefined>) => {
    emits("onEnd", res.detail)
}
//取消
const onCancel = (res: IAnydoorEventResult<undefined>) => {
    emits("onCancel", res.detail)
}
//重复
const onRepeat = (res: IAnydoorEventResult<undefined>) => {
    emits("onRepeat", res.detail)
}
//暂停
const onPause = (res: IAnydoorEventResult<undefined>) => {
    emits("onPause", res.detail)
}
//继续
const onResume = (res: IAnydoorEventResult<undefined>) => {
    emits("onResume", res.detail)
}
//更新
const onUpdate = (res: IAnydoorEventResult<ILottieOnUpdateResult>) => {
    emits("onUpdate", res.detail)
}



//从头播放
const play = async (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.play((res) => {
            resolve(res.success)
        })
    })
}

//播放
const resume = async (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.resume((res) => {
            resolve(res.success)
        })
    })
}
//暂停
const pause = async (): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.pause((res) => {
            resolve(res.success)
        })
    })
}
//设置进度
const setProgress = async (progress: number): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.setProgress(progress, (res) => {
            resolve(res.success)
        })
    })
}
//设置帧率
const setFrame = async (frame: number): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.setFrame(frame, (res) => {
            resolve(res.success)
        })
    })
}

//设置重复次数
const setRepeatCount = async (count: number): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.setRepeatCount(count, (res) => {
            resolve(res.success)
        })
    })
}

//设置速度
const setSpeed = async (speed: number): Promise<boolean | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.setSpeed(speed, (res) => {
            resolve(res.success)
        })
    })
}

//获取信息
const getDetail = async (): Promise<ILottieDetailResult | undefined> => {
    return new Promise((resolve) => {
        mLottie.value?.getDetail((res) => {
            resolve(res.data)
        })
    })
}

defineExpose({
    play,
    resume,
    pause,
    setProgress,
    setFrame,
    setRepeatCount,
    setSpeed,
    getDetail
})
</script>
