import { defineStore } from "pinia"
import {  ref } from "vue"

export const useLessonStore = defineStore("lesson_store", () => {
    const lessonList=ref<any[]>([])

    //是否正在加载中
    const initing=ref<boolean>(true)

    // 传入 number 从0(星期天)到6(星期六)。 如果超出这个范围，它会进位到其他周。
    const weekFirstDay = ref<number>(0)

    //当前的周次
    const currentWeek=ref<number>(0)
    return {
        lessonList,
        weekFirstDay,
        currentWeek,
        initing
    }
})