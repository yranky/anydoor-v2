//学期
export interface ISemesterItem {
    id?: number
    name: string
    tag: string
    ext: {
        start_time?: number
        end_time?: number
    }
}
//课程名称
export interface ILessonNameItem {
    id?: number
    name: string
    color: string
    //tag名称
    semester?: string,
    ext: {

    }
}


//获取的结果
//课程结果
export interface ILessonItemsResult {
    weekday: string,
    name: string,
    teacher?: string,
    weeks: string,
    room?: string,
    classnums: string,
    ext?: {}
}