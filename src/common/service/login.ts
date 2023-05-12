/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:50:42
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-05-10 20:36:19
 * @FilePath: \anydoor-v2\src\common\service\login.ts
 * @Description: login service
 * 
 * Copyright (c) 2023 by anydoor.top|douyeblog.top, All Rights Reserved. 
 */
import { isEmpty } from 'lodash'
import CODE, { restful, success, TYPE } from '../define/code'
import { post } from '../request/http'
import { IUserRuleResult } from '../IForm/login/login'
import ToastModule from '../native/toast/ToastModule'
import User from '../database/user/User'
import { UNI_STORAGE } from '../database/UNI_STORAGE'


//获取用户验证规则
export async function getUserRule(): Promise<IUserRuleResult> {
  const data: any = await post('user_rule', {})
  if (data.code !== CODE.SUCCESS) {
    ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
  } else {
    try {
      for (let key in data.data) {
        data.data[key].reg = data.data[key].reg.split('/').join("")
      }
    } catch { }
  }
  return data.data || {}
}

//登录操作
export async function login(formData: any): Promise<restful<any>> {
  try {
    const data: any = await post('user_login', formData)
    if (data.code === CODE.SUCCESS) {
      //插入表中
      try {
        await (await User.getInstance()).insertUserAccount(data.data.token, data.data.refresh_token);
        await (await User.getInstance()).freshStoreUser()
        await (await User.getInstance()).refreshUserInfo()
      } catch (e: any) {
        ToastModule.show({ text: '登录过程出现异常' + e })
      }
    } else {
      ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
    }
    return data || {}
  } catch (e) {
    ToastModule.show({
      text: '登录时发生错误!' + e
    })
    return {
      code: CODE.ERROR
    }
  }
}

// 刷新token
export async function refreshToken(): Promise<restful> {
  const token = uni.getStorageSync(UNI_STORAGE.USER_ANYDOOR_TOKEN)
  if (isEmpty(token)) {
    return {
      code: CODE.ERROR,
      msg: '参数错误',
      resCode: TYPE.EMPTY
    }
  }
  const refreshTokenItem = token.refresh_token
  const data: any = await post('refresh_token', {
    token: refreshTokenItem
  })
  if (data.code === CODE.SUCCESS) {
    // 保存token
    await (await User.getInstance()).updateUserAccount(data.data.token, data.data.refresh_token || refreshTokenItem);
    await (await User.getInstance()).freshStoreUser()
    return success
  } else {
    return {
      code: CODE.ERROR,
      msg: data.msg,
      resCode: data.code
    }
  }
}
