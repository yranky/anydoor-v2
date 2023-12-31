/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-02-07 13:42:05
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-08-25 21:04:32
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
  TIME = "lesson_time",
  //背景信息
  BACKGROUND = "lesson_background",
  //课程表背景信息
  THEME = "lesson_theme"
}

const LESSON_TABLES: ITables<LESSON_TABLES_NAME> = {
  [LESSON_TABLES_NAME.TEMP]: {
    init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.TEMP}'(
        'id' INTEGER  NOT NULL primary key autoincrement,
        'lesson_id' INTEGER  NOT NULL,
        'semester' text  NOT NULL,
        'weekday' INTEGER  NOT NULL,
        'weeks' text NOT NULL,
        'teacher' text DEFAULT NULL,
        'position' text DEFAULT NULL,
        'time' text NOT NULL,
        'ext' text,
        'company_id' text  NOT NULL
      )
      `,
    drop: `
    drop table ${LESSON_TABLES_NAME.TEMP}
    `
  },
  [LESSON_TABLES_NAME.NAME]: {
    init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.NAME}' (
            'id' INTEGER  NOT NULL primary key autoincrement,
            'name' text NOT NULL,
            'color' text NOT NULL,
            'semester' text NOT NULL,
            'company_id' text  NOT NULL,
            'ext' text
          )
          `
  },
  [LESSON_TABLES_NAME.EDIT]: {
    init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.EDIT}' (
            'id' INTEGER  NOT NULL primary key autoincrement,
            'lesson_id' INTEGER  NOT NULL,
            'action' text NOT NULL,
            'company_id' text  NOT NULL,
            'ext' text,
            'semester' text NOT NULL
          )
          `
  },
  [LESSON_TABLES_NAME.SEMESTER]: {
    init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.SEMESTER}' (
            'id' INTEGER  NOT NULL primary key autoincrement,
            'name' text NOT NULL ,
            'tag' text NOT NULL,
            'company_id' text  NOT NULL,
            'ext' text,
            UNIQUE('name', 'tag', 'company_id')
          )
          `,
    drop: `
    delete from  ${LESSON_TABLES_NAME.SEMESTER}
    `
  },
  [LESSON_TABLES_NAME.RECORDS]: {
    init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.RECORDS}' (
            'id' INTEGER  NOT NULL primary key autoincrement,
            'company_id' text  NOT NULL,
            'create_time' INTEGER NOT NULL,
            'result' text NOT NULL,
            'semester' text,
            'ext' text
          )
          `
  },
  [LESSON_TABLES_NAME.TIME]: {
    init: `
        CREATE TABLE if not exists '${LESSON_TABLES_NAME.TIME}' (
            't_index' INTEGER NOT NULL,
            'start_time' INTEGER NOT NULL,
            'end_time' INTEGER NOT NULL,
            'company_id' text  NOT NULL,
            'ext' text,
            'name' text DEFAULT NULL
          )
        `
  },
  [LESSON_TABLES_NAME.BACKGROUND]: {
    init: `
    CREATE TABLE if not exists '${LESSON_TABLES_NAME.BACKGROUND}' (
      'id' INTEGER NOT NULL,
      'path' text DEFAULT NULL,
      'filename' text NULL,
      'thumb' text NULL,
      'url' text NULL,
      'ext' text DEFAULT NULL
    )
    `
  },
  [LESSON_TABLES_NAME.THEME]: {
    init: `
    CREATE TABLE IF NOT EXISTS ${LESSON_TABLES_NAME.THEME}(
        'key' text not null,
        'value' text,
        primary key ('key')
    );
    `
  }
}

export default LESSON_TABLES