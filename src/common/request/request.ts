/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:36:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-12 14:53:22
 * @FilePath: \anydoor-v2\src\common\request\request.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import service from './service'
// import Qs from 'qs'
import baseService from './common/baseService'
import url from './model/url'

export function postRequest(url: url, data: any) {
  return url.token
    ? service.post(url.url, data)
    : baseService.post(url.url, data)
}

export function getRequest(url: url, data: any) {
  return url.token ? service.get(url.url, data) : baseService.get(url.url, data)
}
