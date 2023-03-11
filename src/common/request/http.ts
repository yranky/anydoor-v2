import { postRequest, getRequest } from './request'

import getUrl from './urls'

// post请求
export function post (name: string, data = {}) {
  return new Promise((resolve, reject) => {
    postRequest(getUrl(name), data)
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}

// get请求
export function get (name: string, data = {}) {
  return new Promise((resolve, reject) => {
    getRequest(getUrl(name), {
      params: data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
