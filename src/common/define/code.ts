/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-08-16 11:00:56
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2022-12-28 16:45:13
 * @FilePath: \backend\src\common\define\code.ts
 * @Description:
 *
 * Copyright (c) 2022 by anydoor.top|douyeblog.top, All Rights Reserved.
 */
/* eslint-disable no-unused-vars */
export enum CODE {
    // 错误
    ERROR = 0,
    // 成功
    SUCCESS = 200
  }

export enum TYPE{
    // 表单为空
    EMPTY=-1
  }

  interface restful<T = any>{
    code:CODE,
    msg?:string,
    data?:T,
    resCode?:any,
    count?:number
  }

const success = {
  code: CODE.SUCCESS
}
export default CODE

export {
  restful, success
}
