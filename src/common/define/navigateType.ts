
/* eslint-disable no-unused-vars */
export enum NAVIGATE_TYPE {
  WEBVIEW = 'webview',
  PAGE = 'page',
  MPROGRAM = 'mprogram'
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
  }
}

export default navigate
