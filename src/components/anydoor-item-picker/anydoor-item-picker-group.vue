<!--
 * @Author: yranky douye@douye.top
 * @Date: 2023-06-15 14:45:48
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-06-15 15:20:21
 * @FilePath: \anydoor-v2\src\components\anydoor-color-picker\anydoor-color-picker-group.vue
 * @Description: item选择器的父级
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
-->
<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { onBackPress } from '@dcloudio/uni-app';
import { provide, ref } from 'vue';
//阻止返回
const disItemPickerBack = ref<boolean>(false)

const setDisItemPickerBack = (disColorPickerBackValue: boolean) => {
    disItemPickerBack.value = disColorPickerBackValue
}

//监听
provide('setDisItemPickerBack', setDisItemPickerBack)
provide('disItemPickerBack', disItemPickerBack)

//返回键
onBackPress(() => {
    const pre = disItemPickerBack.value
    if (disItemPickerBack.value === true) disItemPickerBack.value = false
    return pre
})
</script>
