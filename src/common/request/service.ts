import { useUserStore } from '@/store/user'
import CODE, { restful, TYPE } from '../define/code'
import { refreshToken } from '../service/login'
import service from './common/baseService'
import User from '../database/user/User'
import ToastModule from '../native/toast/ToastModule'
import { linkTo } from '../utils/link'
import { ROUTE_PATH } from '@/router/ROUTE_PATH'

function getTokenByLocal() {
  let token = null
  try {
    token = useUserStore().token
  } catch (e) { }
  return token
}

service.interceptors.request.use((config) => {
  const token = getTokenByLocal()
  if (token) {
    config.headers && (config.headers.token = token)
  }
  // config.headers &&
  //   (config.headers['Content-Type'] = 'application/x-www-form-urlencoded')
  return config
})

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    // 定义8000为token失效 请求重发
    if (res.code === 8000) {
      return refreshToken().then((e: restful) => {
        if (e.code === CODE.SUCCESS) {
          // 请求重发
          return service.request(response.config)
        } else {
          // 如果失败 则返回原来的 并且返回登录页
          // 如果是refresh_token为空了或者refresh_token失效了
          if (e.resCode === TYPE.EMPTY || e.resCode === 1806) {
            // 清除token和refresh_token
            User.getInstance().then(res => {
              return res.logoutUserAccount()
            }).then(() => {
              //跳转登录页
              ToastModule.show({
                text: "用户登录过期，请重新登录!"
              })
              //跳转登录页
              linkTo(ROUTE_PATH.LOGIN, {}, {}, true)
            })
            return Promise.resolve(res)
          }
        }
      })
      // 用户退出登录了或者refresh_token失效
    } else if (res.code === 8001 || res.code === 1806) {
      // 清除token和refresh_token
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')

      //跳转首页

      return Promise.resolve(res)
    }
    return Promise.resolve(res)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
