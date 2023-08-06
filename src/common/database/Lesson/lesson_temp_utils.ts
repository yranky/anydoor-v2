/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-13 22:40:56
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-07-30 15:17:28
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

//将节次转换成数组
export function classnumsToArray(classnums: string): number[][] {
    //先切割,然后排序
    // const tmp = classnums.split(",").map((item) => {
    //     return parseInt(item)
    // }).sort((a: number, b: number) => a - b)
    const tmp = rangeToSequence(classnums).sort((a: number, b: number) => a - b)
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



// 将数字序列转换为范围
// 示例
// const sequence = [1, 2, 3, 4, 5, 9, 10, 89, 900, 901];
// const range = "1-5, 9-10, 89, 900-901";

// const rangeResult = sequenceToRange(sequence);
// const sequenceResult = rangeToSequence(range);

// console.log(rangeResult); // 输出：1-5,9-10,89,900-901
// console.log(sequenceResult); // 输出：[1, 2, 3, 4, 5, 9, 10, 89, 900, 901]
export function sequenceToRange(sequence: number[]): string {
    if (sequence.length === 0) return ""
    sequence.sort((a, b) => a - b);

    let rangeArr: string[] = [];
    let start = sequence[0];
    let prev = start;

    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] !== prev + 1) {
            if (start === prev) {
                rangeArr.push(start.toString());
            } else {
                rangeArr.push(`${start}-${prev}`);
            }
            start = sequence[i];
        }
        prev = sequence[i];
    }

    if (start === prev) {
        rangeArr.push(start.toString());
    } else {
        rangeArr.push(`${start}-${prev}`);
    }

    return rangeArr.join(",");
}

// 将范围转换为数字序列
export function rangeToSequence(range: string): number[] {
    let sequence: number[] = [];

    const rangeArr = range.split(",");
    for (let i = 0; i < rangeArr.length; i++) {
        let rangeItem = rangeArr[i].trim();
        if (rangeItem.includes("-")) {
            let [start, end] = rangeItem.split("-");
            for (let j = parseInt(start); j <= parseInt(end); j++) {
                sequence.push(j);
            }
        } else {
            sequence.push(parseInt(rangeItem));
        }
    }

    return sequence;
}
