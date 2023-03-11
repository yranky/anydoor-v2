/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:36:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-11 22:02:36
 * @FilePath: \anydoor-v2\src\common\request\urls.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import url from './model/url'
import { isUndefined } from 'lodash'
// 链接
const urls: Array<url> = [
  {
    name: 'login_code',
    url: '/api/center/login',
    token: false
  }, {
    name: 'article_list',
    url: 'https://v.api.aa1.cn/api/topbaidu/',
    token: true
  }
]

const getUrlByName = function url(name: string): url {
  const res = urls.find((item) => item.name === name)
  return isUndefined(res)
    ? {
      name,
      url: name,
      token: false
    }
    : res
}

export default getUrlByName
