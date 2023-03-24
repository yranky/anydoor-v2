/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:36:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-24 20:02:02
 * @FilePath: \anydoor-v2\src\common\request\urls.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import url from './model/url'
import { isUndefined } from 'lodash'

const BASE_URL = 'http://192.168.0.231:10001'

// 链接
const urls: Array<url> = [
  //用户验证规则
  {
    name: 'user_rule',
    url: BASE_URL + '/center/user_rule',
    token: false
  },
  //用户登录
  {
    name: 'user_login',
    url: BASE_URL + '/center/app_login',
    token: false
  },
  //通知列表
  {
    name: 'notice_list',
    url: BASE_URL + '/api/notice/list',
    token: false
  },
  //通知详情
  {
    name: 'notice_detail',
    url: BASE_URL + '/api/notice/detail',
    token: false
  },
  {
    name: 'user_find',
    url: 'https://login.douyeblog.top/user/find',
    token: false
  },
  {
    name: 'user_register',
    url: 'https://login.douyeblog.top/user/register',
    token: false
  }
]

const getUrlByName = function url(name: string): url {
  const res = urls.find((item) => item.name === name)
  // console.log(res)
  return isUndefined(res)
    ? {
      name,
      url: name,
      token: false
    }
    : res
}

export default getUrlByName
