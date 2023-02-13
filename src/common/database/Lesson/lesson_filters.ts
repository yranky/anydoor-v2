import { isArrayLike, merge } from "lodash"
import { ILessonNameItem, ISemesterItem } from "./ILesson"
import colors from "./colors"

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
            } catch { }
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
        } catch { }
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
            } catch { }
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
        } catch { }
        return {
            id: data.id,
            name: data.name,
            color: data.color || random_color(),
            semester: data.semester,
            ext
        }
    }
}

//随机颜色
export function random_color(): string {
    return colors[Math.floor(Math.random() * colors.length)] || colors[0]
}