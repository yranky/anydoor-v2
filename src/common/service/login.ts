import { isEmpty } from 'lodash'
import CODE, { restful, success, TYPE } from '../define/code'
import { post } from '../request/http'

// 根据token登录
const loginWithToken = async (code: string | undefined, deviceId: string): Promise<restful> => {
  if (isEmpty(code) || isEmpty(deviceId)) {
    return {
      code: CODE.ERROR,
      msg: '参数错误'
    }
  }
  const data: any = await post('login_code', {
    code,
    device_id: deviceId
  })
  if (data.code === CODE.SUCCESS) {
    // 保存token
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('refresh_token', data.data.refresh_token)
    return success
  } else {
    return {
      code: CODE.ERROR,
      msg: data.msg
    }
  }
}

// 刷新token
const refreshToken = async (): Promise<restful> => {
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

export {
  loginWithToken,
  refreshToken
}
