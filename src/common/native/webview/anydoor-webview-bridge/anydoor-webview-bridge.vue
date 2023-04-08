<template>
    <view>

    </view>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { IMessageResult, IAnydoorWebviewRef } from '../IAnydoorWebview';
import { watch } from 'vue';
import { ICallback, ISend } from './types';
import { CODE, CODE_MSG } from './code';

const props = defineProps(['messageData','mWebview'])

const emits=defineEmits(['update:callbackMessage'])

const {messageData,callbackMessage}= toRefs<{messageData:IMessageResult,callbackMessage:ICallback<any>}>(props)

//在这里监听
watch(()=>messageData.value,(newVal:IMessageResult)=>{
    // console.log(newVal,'in bridge')
    const data:ISend = JSON.parse(newVal.data)
    // console.log(data,'in bridge')
    const sendData:ICallback<any>={
        data: {},
        code: CODE.SUCCESS,
        call_id: data.call_id,
        msg: CODE_MSG[CODE.SUCCESS]
    }
    // console.log(sendData)
    emits("update:callbackMessage",sendData)
    // sendMessage.value(JSON.stringify(sendData))
})

</script>

<style lang="scss" scoped>

</style>