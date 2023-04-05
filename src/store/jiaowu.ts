import { cloneDeep } from "lodash"
import { defineStore } from "pinia"
import { ref } from "vue"

//教务的简称等东西
const jiaowu_config = {
    find_url: '',
    find_alert: '',
    public_key: '',
    user_description: '教务在线',
    user_login_description: '已登录',
    user_not_login_description: '未登录'
}

export const useJiaowuStore = defineStore("jiaowu_store", () => {
    //教务账户
    const jiaowuAccount = ref({
        username: '',
        password: ''
    })
    //是否登录教务
    const isLogin = ref<boolean>(false)

    //重置
    const reset = () => {
        jiaowuAccount.value.username = ""
        jiaowuAccount.value.password = ""
        isLogin.value = false
        jiaowuConfig.value = cloneDeep(jiaowu_config)
    }
    //教务的配置信息
    const jiaowuConfig = ref(cloneDeep(jiaowu_config))

    //设置教务配置
    const setJiaowuConfig = (data: any) => {
        jiaowuConfig.value.find_alert = data.find_alert || ""
        jiaowuConfig.value.find_url = data.find_url || ""
        jiaowuConfig.value.public_key = data.public_key || ""
        jiaowuConfig.value.user_description = data.user_description || "教务在线"
        jiaowuConfig.value.user_login_description = data.user_login_description || "已登录"
        jiaowuConfig.value.user_not_login_description = data.user_not_login_description || "未登录"
    }

    return {
        jiaowuAccount,
        isLogin,
        reset,
        jiaowuConfig,
        setJiaowuConfig
    }
})

export default useJiaowuStore