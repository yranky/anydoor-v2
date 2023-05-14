import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user_store", () => {
    const token = ref<string>()
    const refreshToken = ref<string>()

    const username = ref<string>()
    const nickname = ref<string>()
    const avatar = ref<string>()
    const sex = ref<number>()
    const birth = ref<string>()

    const $reset = () => {
        token.value = ""
        refreshToken.value = ""
        username.value = ""
        nickname.value = ""
        avatar.value = ""
        sex.value = undefined
        birth.value = ""
    }

    return {
        token,
        refreshToken,
        username,
        nickname,
        avatar,
        sex,
        birth,
        $reset
    }
})