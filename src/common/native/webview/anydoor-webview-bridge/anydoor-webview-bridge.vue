<template></template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { IMessageResult, IAnydoorWebviewRef } from '../IAnydoorWebview';
import { watch } from 'vue';
import { ICallback, ISend } from '@/common/webviewHandler/action/types';
import WebviewAction from '@/common/webviewHandler/action/WebviewAction';

const props = defineProps(['messageData', 'mWebview','emits'])

const emits = defineEmits(['update:callbackMessage'])

// @ts-ignore
const { messageData, callbackMessage, mWebview } = toRefs<{ messageData: IMessageResult, callbackMessage: ICallback<any>, mWebview: IAnydoorWebviewRef }>(props)

const webviewAction = new WebviewAction()
//在这里监听
watch(() => messageData.value, async (newVal: IMessageResult) => {
    // console.log(newVal,'in bridge')
    try {
        const data: ISend = JSON.parse(newVal.data)
        //传入解析数据
        emits("update:callbackMessage",await webviewAction.parse(data,mWebview.value,props.emits))
    } catch { }
    // console.log(data,'in bridge')
    // const sendData:ICallback<any>={
    //     data: {},
    //     code: CODE.SUCCESS,
    //     call_id: data.call_id,
    //     msg: CODE_MSG[CODE.SUCCESS]
    // }
    // console.log(sendData)
    // emits("update:callbackMessage",sendData)
    // sendMessage.value(JSON.stringify(sendData))
})

</script>

<style lang="scss" scoped></style>