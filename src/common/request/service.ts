import { useUserStore } from '@/store/user'
import CODE, { restful, TYPE } from '../define/code'
import { refreshToken } from '../service/login'
import service from './common/baseService'
import User from '../database/user/User'
import ToastModule from '../native/toast/ToastModule'
import { linkTo } from '../utils/link'
import { ROUTE_PATH } from '@/router/ROUTE_PATH'
import { getDeviceType } from '../utils/DEVICE_TYPE'

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
    config.header && (config.header.token = token)
  }
  if (config.header) {
    //基座版本
    config.header['appVersion'] = uni.getAppBaseInfo().appVersionCode
    // 应用版本
    config.header['version'] = getApp().globalData!['versionCode']
    // #ifdef APP-PLUS
    //默认安卓(1为安卓，2为ios)
    config.header['platform'] = uni.getSystemInfoSync().platform === 'ios' ? 2 : 1
    // #endif
    // #ifdef MP
    config.header['platform'] = ''
    // #endif
    //添加设备类型
    config.header['device'] = getDeviceType()
  }


  // config.headers &&
  //   (config.headers['Content-Type'] = 'application/x-www-form-urlencoded')
  return config
})

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    // 8000是用户未登录
    // 8001是token过期
    // 8002是用户退出登录了
    if (res.code === 8000) {
      //跳转登录,不提示
      linkTo(ROUTE_PATH.LOGIN, {}, {}, false)
      return Promise.resolve(res)
      //用户退出了
    } else if (res.code === 8002) {
      //提示用户身份过期，并退出登录
      ToastModule.show({
        text: "用户登录过期，请重新登录"
      })
      return User.getInstance().then(instance => {
        return instance.logoutUserAccount()
      }).then(() => {
        //跳转登录页
        return linkTo(ROUTE_PATH.LOGIN, {}, {}, false)
      }).then(() => {
        return Promise.resolve(res)
      })
      //token过期了，就刷新token
    } else if (res.code === 8001) {
      return refreshToken().then((e: restful) => {
        if (e.code === CODE.SUCCESS) {
          // 请求重发
          return service.request(response.config)
        } else {
          // 如果失败 则返回原来的 并且返回登录页
          // 如果是refresh_token为空了或者refresh_token失效了 1806:用户退出了登录,1804：token解析错误,不是有效的token
          if (e.resCode === TYPE.EMPTY || e.resCode === 1806 || e.resCode === 1804) {
            // 清除token和refresh_token
            return User.getInstance().then(res => {
              return res.logoutUserAccount()
            }).then(() => {
              //跳转登录页
              ToastModule.show({
                text: "用户登录过期，请重新登录"
              })
              //跳转登录页
              return linkTo(ROUTE_PATH.LOGIN, {}, {}, false)
            }).then(() => {
              return Promise.resolve(res)
            })
          }
        }
      })
    }
    return Promise.resolve(res)
  },
  (error) => {
    try {
      uni.$anydoor_native.Tool_Module.postErrorSync({
        content: '接口报错!' + JSON.stringify(error)
      })
    } catch { }
    return Promise.reject(error)
  }
)

export default service
