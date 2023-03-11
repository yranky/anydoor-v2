/* eslint-disable no-unused-vars */
export enum MENU_RADIO {
  DEFAULT = 0,
  FORBIDDEN = 1,
}

export const MENU_RADIO_ITEMS = {
  [MENU_RADIO.DEFAULT]: {
    title: '否',
    value: MENU_RADIO.DEFAULT
  },
  [MENU_RADIO.FORBIDDEN]: {
    title: '是',
    value: MENU_RADIO.FORBIDDEN
  }
}

export default MENU_RADIO_ITEMS
