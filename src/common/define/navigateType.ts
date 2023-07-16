
/* eslint-disable no-unused-vars */
export enum NAVIGATE_TYPE {
  WEBVIEW = 'webview',
  PAGE = 'page',
  MPROGRAM = 'mprogram',
  LEGO = "lego"
}

export const navigate = {
  [NAVIGATE_TYPE.WEBVIEW]: {
    title: '网页',
    value: NAVIGATE_TYPE.WEBVIEW
  },
  [NAVIGATE_TYPE.PAGE]: {
    title: '页面',
    value: NAVIGATE_TYPE.PAGE
  },
  [NAVIGATE_TYPE.MPROGRAM]: {
    title: '微应用',
    value: NAVIGATE_TYPE.MPROGRAM
  },
  [NAVIGATE_TYPE.LEGO]: {
    title: '乐高平台',
    value: NAVIGATE_TYPE.LEGO
  }
}

export default navigate
