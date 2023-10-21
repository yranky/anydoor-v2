<template>
    <tm-app ref="app" color="whiteBg">
        <anydoorPage v-model:refresh-complete="refreshComplete" @refresh="refresh">
            <template #navBar>
                <tm-navbar title="详情"></tm-navbar>
            </template>
            <template #content>

            </template>
        </anydoorPage>
    </tm-app>
</template>

<script lang="ts" setup>
import tmApp from "@/tmui/components/tm-app/tm-app.vue"
import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue"
import anydoorPage from "@/components/anydoor-page/anydoor-page.vue"
import { ref } from "vue"

//下拉刷新是否完成
const refreshComplete = ref<boolean>(true)
// 页面刷新
const refresh = async () => {
    refreshComplete.value = false

    refreshComplete.value = true
}


</script>

<style lang="scss" scoped></style>
