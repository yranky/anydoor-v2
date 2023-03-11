/* eslint-disable no-unused-vars */
export enum SOURCE_TYPE {
  PICTURE = 'pic',
  VIDEO = 'video'
}

export const source = {
  [SOURCE_TYPE.PICTURE]: {
    title: '图片',
    value: SOURCE_TYPE.PICTURE
  },
  [SOURCE_TYPE.VIDEO]: {
    title: '视频',
    value: SOURCE_TYPE.VIDEO
  }
}

export default source
