/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:42:05
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-02-07 17:36:45
 * @FilePath: \anydoor-v2\src\common\database\tables\lesson.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { ITables } from "../IDatabase"

export enum LESSON_TABLES_NAME {
    //安装的小程序等
    TEMP = "lesson_temp",
    //课程名称颜色等信息
    NAME = "lesson_name",
    //课程修改记录等信息
    EDIT = "lesson_edit",
    //学期信息
    SEMESTER = "lesson_semester",
    //一些杂项信息
    RECORDS = "lesson_records",
    //时间信息
    TIME = "lesson_time"
}

const LESSON_TABLES: ITables<LESSON_TABLES_NAME> = {
    //安装的小程序等
    [LESSON_TABLES_NAME.TEMP]: {
        init: `
        "CREATE TABLE if not exists '${LESSON_TABLES_NAME.TEMP}'(
        'id' int(11) UNSIGNED NOT NULL primary key autoincrement COMMENT 'id',
        'lesson_id' int(11) UNSIGNED NOT NULL COMMENT '课程id',
        'semester_id' int(11) UNSIGNED NOT NULL COMMENT '学期学年id',
        'weekday' int(11) UNSIGNED NOT NULL COMMENT '星期',
        'weeks' text NOT NULL COMMENT '周次信息',
        'teacher' varchar(300) DEFAULT NULL COMMENT '教师',
        'position' varchar(300) DEFAULT NULL COMMENT '上课地址',
        'time' varchar(300) NOT NULL COMMENT '上课节次信息',
        'ext' text COMMENT '扩展信息'
      ) CHARSET=utf8mb4;
      `
    },
    [LESSON_TABLES_NAME.NAME]: {
        init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.NAME}' (
            'id' int(11) UNSIGNED NOT NULL primary key autoincrement COMMENT '课程id',
            'name' varchar(500) NOT NULL COMMENT '课程名称',
            'color' varchar(200) NOT NULL COMMENT '课程颜色信息',
            'semester' int(11) UNSIGNED NOT NULL COMMENT '课程学期id',
            'ext' text COMMENT '扩展字段，json字符串'
          ) CHARSET=utf8mb4;
          `
    },
    [LESSON_TABLES_NAME.EDIT]: {
        init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.EDIT}' (
            'id' int(11) UNSIGNED NOT NULL primary key autoincrement COMMENT '修改id',
            'lesson_id' int(11) UNSIGNED NOT NULL COMMENT '对应的课程id',
            'action' varchar(300) NOT NULL COMMENT '修改的标识',
            'ext' text COMMENT '修改的内容等',
            'semester_id' int(11) UNSIGNED NOT NULL COMMENT '修改对应的学期id'
          ) CHARSET=utf8mb4;
          `
    },
    [LESSON_TABLES_NAME.SEMESTER]: {
        init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.SEMESTER}' (
            'id' int(11) UNSIGNED NOT NULL primary key autoincrement COMMENT '学期id',
            'name' varchar(300) NOT NULL COMMENT '学期名称',
            'tag' varchar(300) NOT NULL COMMENT '学期标识',
            'ext' text COMMENT '扩展字段'
          ) CHARSET=utf8mb4;
          `
    },
    [LESSON_TABLES_NAME.RECORDS]: {
        init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.RECORDS}' (
            'id' int(11) UNSIGNED NOT NULL primary key autoincrement COMMENT 'id',
            'company_id' int(11) UNSIGNED NOT NULL COMMENT '学校id',
            'create_time' datetime NOT NULL COMMENT '创建时间',
            'result' text NOT NULL COMMENT '结果信息，json',
            'ext' text COMMENT '扩展信息'
          ) CHARSET=utf8mb4;
          `
    },
    [LESSON_TABLES_NAME.TIME]: {
        init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.TIME}' (
            't_index' int(10) UNSIGNED NOT NULL COMMENT '时间索引',
            'start_time' datetime NOT NULL COMMENT '开始时间',
            'end_time' datetime NOT NULL COMMENT '结束时间',
            'ext' text COMMENT '扩展信息',
            'name' varchar(200) DEFAULT NULL COMMENT '名称'
          ) CHARSET=utf8mb4;
        `
    }
}

export default LESSON_TABLES