import Lesson from "@/common/database/Lesson/Lesson"
import Device from "@/common/database/device/Device"
import User from "@/common/database/user/User"
import nativeInit from "@/common/native/nativeInit"
import Theme from "@/common/theme/Theme"
import useJiaowuStore from "@/store/jiaowu"
import { useLessonStore } from "@/store/lesson"
import { SQLITE_STATUS_CODE } from "./common/sql/SQLite"
import dayjs from "dayjs"
import Update from "./common/update/Update"
import { useUserStore } from "./store/user"
import { UNI_STORAGE } from "./common/database/UNI_STORAGE"
import { isEmpty } from "lodash"
import useDeviceStore from "./store/device"
import { ILessonTempItemResult, LESSON_BACKGROUND_TYPE } from "./common/database/Lesson/ILesson"
import { getFileInfo } from "./common/utils/ioUtils"
import Encrypt from "./common/encrypt/Encrypt"
import { jwConfig, jwLogin } from "./common/service/jw"
import ToastModule from "./common/native/toast/ToastModule"
import CODE from "./common/define/code"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 15:18:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-03 08:48:33
 * @FilePath: \anydoor-v2\src\init.ts
 * @Description: 初始化
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
export default async function init() {
    //初始化uni
    uni.$anydoor = {}
    //初始化原生插件
    nativeInit()
    //初始化device_id

    try {
        await (await Device.getInstance()).initDeviceId()
    } catch { }


    //初始化课程背景
    try {
        const LessonInstance = await Lesson.getInstance()
        const lessonStore = useLessonStore()
        const result = await LessonInstance.getBackground()
        if (!result) {
            lessonStore.lessonBackground.background = ""
            lessonStore.lessonBackground.fullPath = "../../static/bg/bg.png"
            lessonStore.lessonBackground.type = LESSON_BACKGROUND_TYPE.IMAGE
        } else {
            let fullPath = result.fullPath
            //检测文件存不存在
            if (result.type === LESSON_BACKGROUND_TYPE.IMAGE) {
                try {
                    await getFileInfo(result.fullPath || "")
                } catch {
                    fullPath = "../../static/bg/bg.png"
                }
            }
            lessonStore.lessonBackground.background = result.background
            lessonStore.lessonBackground.fullPath = fullPath
            lessonStore.lessonBackground.type = result.type
        }
    } catch { }

    //初始化用户
    try {
        const UserModule = await User.getInstance()
        await UserModule.initDataTable()
    } catch { }
    //主题部分
    try {
        const ThemeInstance = await Theme.getInstance()
    } catch { }

    //新版本检测
    try {
        //更新
        Update.getInstance().update()
    } catch {

    }
}

//初始化用户信息等
export async function initUser(fresh: boolean = false) {
    if (!fresh) {
        //#region 用户
        try {
            await (await User.getInstance()).freshStoreUser()
            const userStore = useUserStore()
            //如果有token说明登录了
            if (userStore.token) {
                //刷新用户信息
                User.getInstance().then((res) => res.refreshUserInfo())
            }
        } catch { }

        //#endregion
    }


    //#region 教务用户
    //初始化用户
    try {
        const jiaowuAccount = await (await User.getInstance()).getJiaowuAccount(true)
        // 加载store
        const store = useJiaowuStore()
        //如果是false，则说明未登录
        if (jiaowuAccount !== false) {
            //教务密码
            store.$patch(state => {
                state.jiaowuAccount.username = jiaowuAccount.username
                state.jiaowuAccount.password = jiaowuAccount.password
                state.isLogin = true
                //个人信息
                state.userInfo = (jiaowuAccount.jw_data as any).stuInfo || {}
                //更新时间
                state.updateTime = (jiaowuAccount as any).update_time || ""
            })
            //教务配置
            store.setJiaowuConfig(jiaowuAccount)

            //设置周次
            store.setWeek({
                nowWeek: (jiaowuAccount.jw_data as any)['nowWeek'],
                allWeek: (jiaowuAccount.jw_data as any)['allWeek'],
                holiday: (jiaowuAccount.jw_data as any)['week'] == '假期中'
            })

            //判断是否需要更新
            if (!fresh) {
                //如果是假期中，则必须刷新
                if ((jiaowuAccount.jw_data as any)['week'] == '假期中') {
                    (await User.getInstance()).freshJiaowuAccount()
                } else {
                    //计算更新时间
                    const update_time = dayjs((jiaowuAccount as any).update_time)
                    //更新
                    if (dayjs().diff(update_time, "day") > store.jiaowuConfig.timetable_temp || !update_time.isValid()) {
                        (await User.getInstance()).freshJiaowuAccount()
                    }
                }
            }
        } else {
            store.reset()
        }
    } catch { }

}

//课程信息
export async function initLesson() {

    try {
        const lessonStore = useLessonStore()
        const LessonInstance = await Lesson.getInstance()
        const jiaowuStore = useJiaowuStore()
        //设置当前的周次
        LessonInstance.setCurrentWeek()
        const data: ILessonTempItemResult[] = await LessonInstance.getLessonList()
        lessonStore.lessonList = data || []
        //初始化完成
        lessonStore.initing = false

        //推算需不需要更新数据
        const cid = jiaowuStore.jiaowuConfig.cid
        if (cid) {
            //先打印出记录
            const res = await LessonInstance.getLatestRecord(cid)
            if (res?.code === SQLITE_STATUS_CODE.SUCCESS) {
                //当前的学期信息
                lessonStore.semester = res.data[0] ? (res.data[0].semester || "") : ''
                const create_time = res.data[0] ? (res.data[0].create_time || 0) : 0
                const create_time_dayjs = dayjs(Number(create_time))
                //根据创建时间(如果超过设定的时间,则进行更新操作)
                if (dayjs().diff(create_time_dayjs, "day") > jiaowuStore.jiaowuConfig.timetable_temp || !create_time_dayjs.isValid()) {

                    await LessonInstance.freshTimeTable(lessonStore.semester)

                    const data: any = await LessonInstance.getLessonList()

                    lessonStore.lessonList = data || []
                }
            }
        }

    } catch { }
}

//从storage初始化数据
export function initFromStorageSync() {
    try {
        //初始化设备id
        const deviceId = uni.getStorageSync(UNI_STORAGE.UNI_DEVICE_ID)
        if (!isEmpty(deviceId)) {
            const deviceStore = useDeviceStore()
            deviceStore.deviceId = deviceId
        }
    } catch { }

    try {
        //初始化学校信息
        const schoolInfo = uni.getStorageSync(UNI_STORAGE.JW_SCHOOL_INFO)
        if (!isEmpty(schoolInfo)) {
            const jiaowuStore = useJiaowuStore()
            jiaowuStore.jiaowuConfig.cid = schoolInfo.cid || ''
            jiaowuStore.jiaowuConfig.school_name = schoolInfo.school_name || ""
        }
    } catch { }

    try {
        //初始化用户token信息
        const token = uni.getStorageSync(UNI_STORAGE.USER_ANYDOOR_TOKEN)
        const userStore = useUserStore()
        if (!isEmpty(token)) {
            userStore.token = token.token
            userStore.refreshToken = token.refresh_token
        }
        //加载用户信息
        const userinfo = uni.getStorageSync(UNI_STORAGE.USER_ANYDOOR_INFO)
        if (!isEmpty(userinfo)) {
            userStore.$patch((state) => {
                for (let key in userinfo) {
                    if (Object.keys(state).includes(key)) {
                        state[key as keyof typeof state] = userinfo[key]
                    }
                }
            })
        }
    } catch { }
}