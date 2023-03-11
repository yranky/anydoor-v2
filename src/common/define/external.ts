/* eslint-disable no-unused-vars */
export enum EXTERNAL_TYPE {
  DEFAULT = 0,
  FORBIDDEN = 1
}

export const external = {
  [EXTERNAL_TYPE.DEFAULT]: {
    title: '非外部打开',
    value: EXTERNAL_TYPE.DEFAULT
  },
  [EXTERNAL_TYPE.FORBIDDEN]: {
    title: '外部打开',
    value: EXTERNAL_TYPE.FORBIDDEN
  }
}

export default external
