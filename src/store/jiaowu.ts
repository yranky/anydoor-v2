import { cloneDeep, values } from "lodash"
import { defineStore } from "pinia"
import { ref } from "vue"

//教务的简称等东西
const jiaowu_config = {
    find_url: '',
    find_alert: '',
    public_key: '',
    user_description: '教务在线',
    user_login_description: '已登录',
    user_not_login_description: '未登录',
    cid: '',
    timetable_temp: 7,
    plan_temp: 7,
    score_temp: 7,
    school_name: ''
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
        userInfo.value = {}
        week.value = {
            nowWeek: 0,
            allWeek: 0,
            holiday: false
        }
        updateTime.value = ""
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
        jiaowuConfig.value.cid = data.cid || ""
        jiaowuConfig.value.timetable_temp = isNaN(Number(data.timetable_temp)) ? 7 : data.timetable_temp
        jiaowuConfig.value.score_temp = isNaN(Number(data.score_temp)) ? 7 : data.score_temp
        jiaowuConfig.value.plan_temp = isNaN(Number(data.plan_temp)) ? 7 : data.plan_temp
        jiaowuConfig.value.school_name = data.school_name || ""
    }

    //教务个人信息
    const userInfo = ref({})
    //设置教务个人信息
    const setUserInfo = (data: any) => {
        userInfo.value = data
    }

    //周次
    const week = ref({
        nowWeek: 0,
        allWeek: 0,
        //是否处于暑假，用于隐藏时间
        holiday: false
    })
    //设置周次
    const setWeek = (data: {
        nowWeek: number,
        allWeek: number,
        holiday?: boolean
    }) => {
        const now = Number(data.nowWeek)
        const all = Number(data.allWeek)
        week.value.nowWeek = isNaN(now) ? 0 : now
        week.value.allWeek = isNaN(all) ? 0 : all
        week.value.holiday = data.holiday || false
    }

    const updateTime = ref<string>("")

    return {
        jiaowuAccount,
        isLogin,
        reset,
        jiaowuConfig,
        setJiaowuConfig,
        userInfo,
        setUserInfo,
        week,
        setWeek,
        updateTime
    }
})

export default useJiaowuStore