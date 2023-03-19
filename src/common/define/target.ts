/*
 * @Author: yranky douye@douye.top
 * @Date: 2022-12-30 15:48:00
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-01-04 14:17:22
 * @FilePath: \backend\src\common\define\target.ts
 * @Description: a标签的target
 *
 * Copyright (c) 2022 by anydoor.top|douyeblog.top, All Rights Reserved.
 */
/* eslint-disable no-unused-vars */
export enum TARGET_TYPE {
  BLANK='_blank',
  SELF='_self',
  TOP='_top',
  PARENT='_parent'
}

export const TARGET = {
  [TARGET_TYPE.BLANK]: {
    title: '新窗口',
    value: TARGET_TYPE.BLANK
  },
  [TARGET_TYPE.SELF]: {
    title: '本窗口',
    value: TARGET_TYPE.SELF
  },
  [TARGET_TYPE.TOP]: {
    title: '整个窗口',
    value: TARGET_TYPE.TOP
  },
  [TARGET_TYPE.PARENT]: {
    title: '父框架集',
    value: TARGET_TYPE.PARENT
  }
}

export default TARGET
