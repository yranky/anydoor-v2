/* eslint-disable no-unused-vars */
export enum STATUS_TYPE {
  DEFAULT = 0,
  FORBIDDEN = 1,
  HIDE = 2
}

export const status = {
  [STATUS_TYPE.DEFAULT]: {
    title: '正常',
    value: STATUS_TYPE.DEFAULT
  },
  [STATUS_TYPE.FORBIDDEN]: {
    title: '禁用',
    value: STATUS_TYPE.FORBIDDEN
  },
  [STATUS_TYPE.HIDE]: {
    title: '隐藏',
    value: STATUS_TYPE.HIDE
  }
}

export default status
