import axios from 'axios'
import router from '@/plugins/router'
import store from '@/plugins/store'
import { Loading, Message } from 'element-ui'

const tip = msg => {
  Message.error({ message: msg })
}

const toLogin = () => {
  router.replace('/')
}

const errorHandle = (state, other) => {
  switch (state) {
    case 401:
      toLogin()
      break
    case 403:
      tip('登录过期，请重新登录！')
      store.commit('token', '')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    case 404:
      tip('请求资源不存在')
      break
    default:
      tip(other)
  }
}

var instance = axios.create({ timeout: 1000 * 12 })
var loadingObj = {}

instance.interceptors.request.use(
  config => {
    loadingObj = Loading.service({
      customClass: 'loading',
      background: 'rgba(0,0,0,.5)'
    })
    const token = store.state.token
    if (token) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
  error => {
    loadingObj.close()
    Promise.error(error)
  }
)

instance.interceptors.response.use(
  response => {
    loadingObj.close()
    if (response.data) {
      let data = JSON.parse(response.data)
      if (data.status === 200) {
        return Promise.resolve(data)
      } else {
        errorHandle(data.status, data.message)
      }
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    loadingObj.close()
    // 发请求
    errorHandle(error.status, error.message)
    return Promise.reject(error)
  }
)

export default instance
