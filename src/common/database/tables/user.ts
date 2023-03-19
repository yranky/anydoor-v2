/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-12 16:33:09
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-12 19:12:22
 * @FilePath: \anydoor-v2\src\common\database\tables\user.ts
 * @Description: 用户表
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { ITables } from "../IDatabase";

export enum USER_TABLES_NAME {
  //用户token
  TOKEN = "user_token",
  //用户名等数据
  ACCOUNT = "user_account",
  //当前用户
  CURRENT = "user_current"
}

const USER_TABLES: ITables<USER_TABLES_NAME> = {
  [USER_TABLES_NAME.TOKEN]: {
    init: `
        CREATE TABLE if not exists '${USER_TABLES_NAME.TOKEN}'(
        'id' INTEGER  NOT NULL primary key autoincrement,
        'token' text  NOT NULL,
        'refresh_token' text  NOT NULL,
        'create_time' INTEGER NOT NULL,
        'update_time' INTEGER NOT NULL,
        'uid' INTEGER  NOT NULL,
        'ext' text
      )
      `,
    drop: `
        drop table ${USER_TABLES_NAME.TOKEN}
        `
  },
  [USER_TABLES_NAME.ACCOUNT]: {
    init: `
        CREATE TABLE if not exists '${USER_TABLES_NAME.ACCOUNT}'(
        'id' INTEGER  NOT NULL primary key autoincrement,
        'username' text   NULL,
        'nickname' text   NULL,
        'avatar' text  NULL,
        'open_id' text NULL,
        'current' INTEGER , 
        'ext' text
      )
      `,
    drop: `
        drop table ${USER_TABLES_NAME.ACCOUNT}
        `
  },
  [USER_TABLES_NAME.CURRENT]: {
    init: `
    CREATE TABLE if not exists '${USER_TABLES_NAME.CURRENT}'(
    'uid' INTEGER  NOT NULL , 
    'ext' text
  )
  `,
    drop: `
    drop table ${USER_TABLES_NAME.CURRENT}
    `
  }
}
export default USER_TABLES