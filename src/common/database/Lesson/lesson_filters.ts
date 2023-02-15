import { isArrayLike, merge } from "lodash"
import { ILessonNameItem, ILessonTempItemResult, ISemesterItem } from "./ILesson"
import colors from "./colors"
import ErrorHandler from "../../errorHandler/ErrorHandler"
import ERROR_TARGET from "../../errorHandler/ERROR_TARGET"

//合并两个item
export function mergeItem<T>(preItem: T, afterItem: T) {
    return merge(preItem, afterItem)
}

//filter学期数据
export function Filter_ISemester(data: any): ISemesterItem | ISemesterItem[] {
    if (isArrayLike(data)) data = [...data]
    if (data instanceof Array) {
        return data.map((item) => {
            let ext = {}
            try {
                ext = JSON.parse(decodeURIComponent(item.ext))
            } catch (e) {
                //错误上报
                ErrorHandler.push(ERROR_TARGET.LESSON_FILTER, JSON.stringify(e))
            }
            return {
                id: item.id,
                name: item.name,
                tag: item.tag,
                ext
            }
        }) || []
    } else {
        let ext = {}
        try {
            ext = JSON.parse(decodeURIComponent(data.ext))
        } catch (e) {
            //错误上报
            ErrorHandler.push(ERROR_TARGET.LESSON_FILTER, JSON.stringify(e))
        }
        return {
            id: data.id,
            name: data.name,
            tag: data.tag,
            ext
        }
    }
}

//filter课程名称数据
export function Filter_ILessonName(data: any): ILessonNameItem | ILessonNameItem[] {
    if (isArrayLike(data)) data = [...data]
    if (data instanceof Array) {
        return data.map((item) => {
            let ext = {}
            try {
                ext = JSON.parse(decodeURIComponent(item.ext))
            } catch (e) {
                //错误上报
                ErrorHandler.push(ERROR_TARGET.LESSON_FILTER, JSON.stringify(e))
            }
            return {
                id: item.id,
                name: item.name,
                color: item.color || random_color(),
                semester: item.semester,
                ext
            }
        }) || []
    } else {
        let ext = {}
        try {
            ext = JSON.parse(decodeURIComponent(data.ext))
        } catch (e) {
            //错误上报
            ErrorHandler.push(ERROR_TARGET.LESSON_FILTER, JSON.stringify(e))
        }
        return {
            id: data.id,
            name: data.name,
            color: data.color || random_color(),
            semester: data.semester,
            ext
        }
    }
}

//解析temp
export function Filter_ILessonTempResult(data: any): ILessonTempItemResult[] {
    if (isArrayLike(data)) data = [...data]
    if (data instanceof Array) {
        return data.map((item) => {
            let weeks = []
            let time = [0, 1]
            try {
                weeks = JSON.parse(item.weeks)
                time = JSON.parse(item.time)
                //如果只有一节
                if (time.length === 1) time = [time[0], time[0]]
            } catch (e) {
                //错误上报
                ErrorHandler.push(ERROR_TARGET.LESSON_FILTER, JSON.stringify(e))
            }
            let temp_ext = {}
            let name_ext = {}
            try {
                temp_ext = JSON.parse(decodeURIComponent(item.a_ext))
                name_ext = JSON.parse(decodeURIComponent(item.b_ext))
            } catch (e) {
                //错误上报
                ErrorHandler.push(ERROR_TARGET.LESSON_FILTER, JSON.stringify(e))
            }
            return {
                name: item.name || '',
                teacher: item.teacher || '',
                position: item.position || '',
                semester: item.semester || '',
                color: item.color || '#4f52ff',
                week: item.weekday || 0,
                weeks,
                time,
                lesson_id: item.lesson_id,
                temp_id: item.temp_id,
                ext: {
                    temp: temp_ext,
                    name: name_ext
                }
            }
        })
    }
    return []
}

//随机颜色
export function random_color(): string {
    return colors[Math.floor(Math.random() * colors.length)] || colors[0]
}