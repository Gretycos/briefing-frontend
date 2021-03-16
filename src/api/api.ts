import axios from 'axios'
import Qs from 'qs'

const baseURL = 'http://39.105.43.226:8080'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded' // 设置很关键
  }
  return config
},
err => {
  return Promise.reject(err)
})

export function getTitleList (parameter?: any) {
  return axios.post(baseURL + '/summary/getTitleListByTime', Qs.stringify(parameter))
    .then((res: { data: any }) => res.data)
}

export function newsCountList () {
  return axios.post(baseURL + '/news/countList')
    .then((res: { data: any }) => res.data)
}
