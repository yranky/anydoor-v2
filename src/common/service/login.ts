/*
 * @Author: yranky douye@douye.top
 * @Date: 2023-03-11 21:50:42
 * @LastEditors: yranky douye@douye.top
 * @LastEditTime: 2023-03-12 16:04:08
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
  const data: any = await post('user_login', formData)
  if (data.code !== CODE.SUCCESS) {
    ToastModule.show({ text: data.msg + `(错误码:${data.code})` })
  }
  return data || {}
}



// 根据token登录
// const loginWithToken = async (code: string | undefined, deviceId: string): Promise<restful> => {
//   if (isEmpty(code) || isEmpty(deviceId)) {
//     return {
//       code: CODE.ERROR,
//       msg: '参数错误'
//     }
//   }
//   const data: any = await post('login_code', {
//     code,
//     device_id: deviceId
//   })
//   if (data.code === CODE.SUCCESS) {
//     // 保存token
//     localStorage.setItem('token', data.data.token)
//     localStorage.setItem('refresh_token', data.data.refresh_token)
//     return success
//   } else {
//     return {
//       code: CODE.ERROR,
//       msg: data.msg
//     }
//   }
// }

// // 刷新token
export async function refreshToken(): Promise<restful> {
  const refreshTokenItem = localStorage.getItem('refresh_token')
  if (isEmpty(refreshTokenItem)) {
    return {
      code: CODE.ERROR,
      msg: '参数错误',
      resCode: TYPE.EMPTY
    }
  }
  const data: any = await post('refresh_token', {
    token: refreshTokenItem
  })
  if (data.code === CODE.SUCCESS) {
    // 保存token
    localStorage.setItem('token', data.data.token)
    return success
  } else {
    // // 否则清除所有
    // localStorage.removeItem('token')
    // localStorage.removeItem('refresh_token')
    return {
      code: CODE.ERROR,
      msg: data.msg,
      resCode: data.code
    }
  }
}

// export {
//   // loginWithToken,
//   // refreshToken,
//   getUserRule
// }
