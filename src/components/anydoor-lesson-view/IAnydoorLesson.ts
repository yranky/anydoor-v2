/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-01-17 17:23:48
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-14 11:19:37
 * @FilePath: \anydoor-v2\src\components\anydoor-lesson-view\IAnydoorLesson.ts
 * @Description: 接口
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */


//课程接口定义
export default interface IAnydoorLesson {
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
    color: string
}
export enum ILessonTagType {
    //删除
    DELETE = "delete",
    //添加
    ADD = "add",
    //修改
    EDIT = "edit"
}

//标记
export interface ILessonTag {
    //类型
    type: ILessonTagType,
    //标记修改的课程
    name: string,
    //标记修改的学期
    semester: string,
    //修改的内容
    content: {
        key: [keyof IAnydoorLesson],
        value: string | number[]
    }[]
}