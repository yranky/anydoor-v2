/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-18 14:04:47
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-18 14:23:26
 * @FilePath: \anydoor-v2\src\common\utils\date.ts
 * @Description: 日期工具
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
// 计算两个日期之间的天数
import * as dayjs from "@/tmui/tool/dayjs/esm/index"
export function diffTwoDays(from: string, to?: string) {
    const dayjs_to: dayjs.Dayjs = dayjs.default(to === undefined ? new Date() : to)
    const dayjs_from: dayjs.Dayjs = dayjs.default(from)
    //计算隔了几分钟
    const minute_diff = dayjs_to.diff(dayjs_from, "minute")
    //十分钟以内返回刚刚
    if (minute_diff < 10) return '刚刚'
    //61分钟以内显示分钟前
    if (minute_diff < 61) return minute_diff + '分钟前'
    //计算隔了几个小时
    const hour_diff = dayjs_to.diff(dayjs_from, 'hour')
    //25小时以内,显示小时前
    if (hour_diff < 25) return hour_diff + '小时前'
    //先计算隔了多少天
    const day_diff = dayjs_to.diff(dayjs_from, 'day')
    //如果少于32天，则直接返回多少天前
    if (day_diff < 32) return day_diff + '天前'
    //隔了多少个月
    const month_diff = dayjs_to.diff(dayjs_from, 'month')
    if (month_diff < 13) return month_diff + '月前'
    //否则多少年前
    const year_diff = dayjs_to.diff(dayjs_from, 'year')
    if (year_diff < 3) return year_diff + '年前'
    //都不符合返回日期
    return dayjs_from.format("YYYY-MM-DD")
}