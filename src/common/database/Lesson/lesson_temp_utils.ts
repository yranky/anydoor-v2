/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-13 22:40:56
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-13 23:08:37
 * @FilePath: \anydoor-v2\src\common\database\Lesson\lesson_temp_utils.ts
 * @Description: 字符串转时间数组
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */

//weeks转数组
export function weeksToArray(weeks: string): number[] {
    const result: number[] = []
    //先切割,号
    const tmp_dot = weeks.split(",")
    tmp_dot.forEach(item => {
        //切割-号
        const tmp = item.split("-")
        if (tmp.length === 1) {
            result.push(parseInt(tmp[0]) as number)
        } else {
            const start: number = parseInt(tmp[0])
            const end: number = parseInt(tmp[1])
            for (let i = start; i <= end; i++) {
                result.push(i)
            }
        }
    })
    return result
}

export function classnumsToArray(classnums: string): number[][] {
    //先切割,，然后排序
    const tmp = classnums.split(",").map((item) => {
        return parseInt(item)
    }).sort((a: number, b: number) => a - b)
    //转化为数组范围
    const result: number[][] = []
    // let r = []
    let i: number = 0
    let start: number = 0
    while (i++ < tmp.length)
        if (tmp[i] - tmp[i - 1] !== 1) {
            if (i - start === 1) result.push([tmp[start]])
            else result.push([tmp[start], tmp[i - 1]])
            // r.push(tmp[start] + (i - start === 1 ? '' : '->' + tmp[i - 1]))
            start = i
        }

    return result
}

