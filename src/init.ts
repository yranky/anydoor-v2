import Lesson from "@/common/database/Lesson/Lesson"
import Device from "@/common/database/device/Device"
import User from "@/common/database/user/User"
import nativeInit from "@/common/native/nativeInit"
import Theme from "@/common/theme/Theme"
import useJiaowuStore from "@/store/jiaowu"
import { useLessonStore } from "@/store/lesson"
import { SQLITE_STATUS_CODE } from "./common/sql/SQLite"
import dayjs from "dayjs"

/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-17 15:18:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-04-09 17:22:05
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
    await (await Device.getInstance()).initDeviceId()

    //初始化用户
    const UserModule = await User.getInstance()
    await UserModule.initDataTable()

    //主题部分
    const ThemeInstance = await Theme.getInstance()
}

//初始化用户信息等
export async function initUser() {
    //#region 教务用户
    //初始化用户
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
            allWeek: (jiaowuAccount.jw_data as any)['allWeek']
        })
    } else {
        store.reset()
    }
    //#endregion
    //#region 用户

    //#endregion

}

//课程信息
export async function initLesson() {
    const lessonStore = useLessonStore()
    const LessonInstance = await Lesson.getInstance()
    const jiaowuStore = useJiaowuStore()
    //设置当前的周次
    LessonInstance.setCurrentWeek()
    const data: any = await LessonInstance.getLessonList()
    lessonStore.lessonList = data || []

    //推算需不需要更新数据
    const cid = jiaowuStore.jiaowuConfig.cid
    if (cid) {
        //先打印出记录
        const res = await LessonInstance.getLatestRecord(cid)
        if (res?.code === SQLITE_STATUS_CODE.SUCCESS) {
            //当前的学期信息
            lessonStore.semester = res.data[0] ? (res.data[0].semester || "") : ''
            const create_time=res.data[0] ? (res.data[0].create_time || 0) : 0
            const create_time_dayjs=dayjs(Number(create_time))
            //根据创建时间(如果超过设定的时间,则进行更新操作)
            if(dayjs().diff(create_time_dayjs,"day")>jiaowuStore.jiaowuConfig.timetable_temp||!create_time_dayjs.isValid()){

                await LessonInstance.freshTimeTable(lessonStore.semester)

                const data: any = await LessonInstance.getLessonList()
                
                lessonStore.lessonList = data || []
            }
        }
    }

    //初始化完成
    lessonStore.initing = false
}