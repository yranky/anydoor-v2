import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore("device_store", () => {
    //设备id
    const deviceId = ref<string>('')

    return {
        deviceId
    }
})

export default useDeviceStore