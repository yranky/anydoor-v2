//学期
export interface ISemesterItem {
    id?: number
    name: string
    tag: string
    ext: {
        start_time?: number
        end_time?: number
    }
    company_id: string
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
    company_id: string
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

//temp结果
export interface ILessonTempItemResult {
    //课程名称:必填
    name: string,
    //教师
    teacher: string,
    //教室
    position: string,
    //学期
    semester: string,
    //星期(0-6)
    week: number[],
    //节次,两个1-2节传[1,2]
    time: number[],
    //周次(第几周，可以传任意多个)
    weeks: number[],
    //颜色
    color: string,
    //课程id
    lesson_id: number,
    //temp_id
    temp_id: number,
    ext: {
        temp: any,
        name: any
    }
}

//类型
export enum LESSON_EDIT_TYPE {
    ADD = "add",
    EDIT = "edit",
    REMOVE = "remove"
}