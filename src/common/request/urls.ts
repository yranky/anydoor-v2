/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:36:01
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-06-07 10:12:01
 * @FilePath: \anydoor-v2\src\common\request\urls.ts
 * @Description: 链接
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import url from './model/url'
import { isUndefined, truncate } from 'lodash'

const BASE_URL = 'http://192.168.124.9:10001'
//乐高平台地址
export const BASE_LEGO_URL = 'http://192.168.124.9:9000/lowcode/editor/preview.html?id='
// export const UCENTER_BASE_URL = 'http://test.anydoor.douyeblog.top:10000'
export const UCENTER_BASE_URL = 'https://login.douyeblog.top'

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
  //用户登录
  {
    name: 'user_union_login',
    url: BASE_URL + '/center/app_login/union',
    token: false
  },
  //刷新令牌
  {
    name: 'refresh_token',
    url: BASE_URL + '/center/refresh_token',
    token: true
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
  //轮播图
  {
    name: 'swiper_list',
    url: BASE_URL + '/api/swiper/list',
    token: false
  },
  //菜单列表
  {
    name: 'menu_list',
    url: BASE_URL + '/api/menu/list',
    token: false
  },
  //提示列表
  {
    name: 'tip_list',
    url: BASE_URL + '/api/tip/list',
    token: false
  },
  //高校列表
  {
    name: 'company_list',
    url: BASE_URL + '/api/company/list',
    token: false
  },
  //教务配置项信息
  {
    name: 'jw_config',
    url: BASE_URL + '/api/jw/config',
    token: false
  },
  //教务登录
  {
    name: 'jw_login',
    url: BASE_URL + '/api/jw/info',
    token: false
  },
  //教务教学计划
  {
    name: 'jw_plan',
    url: BASE_URL + '/api/jw/plan',
    token: false
  },
  //教务成绩
  {
    name: 'jw_score',
    url: BASE_URL + '/api/jw/score',
    token: false
  },
  //教务课程表
  {
    name: 'jw_timetable',
    url: BASE_URL + '/api/jw/timetable',
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
  },
  {
    name: 'mprogram_list',
    url: BASE_URL + '/api/mprogram/list',
    token: false
  },
  {
    name: 'mprogram_item',
    url: BASE_URL + '/api/mprogram/item',
    token: false
  },
  //用户信息
  {
    name: 'user_info',
    url: BASE_URL + '/api/user/info',
    token: true
  },
  //扫码登录
  {
    name: 'user_scan_login',
    url: BASE_URL + '/api/user/scan',
    token: true
  },
  //登录中心
  {
    name: 'login_center',
    url: BASE_URL + '/api/auth/center',
    token: true
  },
  //文章列表
  {
    name: 'article_list',
    url: BASE_URL + '/api/article/list',
    token: false
  },
  //文章列表
  {
    name: 'article_type',
    url: BASE_URL + '/api/article/type',
    token: false
  },
  //文章详情
  {
    name: 'article_detail',
    url: BASE_URL + '/api/article/detail',
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
