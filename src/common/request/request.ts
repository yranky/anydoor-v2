import service from './service'
// import Qs from 'qs'
import baseService from './common/baseService'
import url from './model/url'

export function postRequest (url: url, data: any) {
  return url.token
    ? service.post(url.url, data)
    : baseService.post(url.url, data)
}

export function getRequest (url: url, data: any) {
  return url.token ? service.get(url.url, data) : baseService.get(url.url, data)
}
