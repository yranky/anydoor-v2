import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore("config_store", () => {
    //是否调试
    const debug = ref<boolean>(process.env.NODE_ENV === "development" ? true : false)


    return {
        debug
    }
})

export default useConfigStore