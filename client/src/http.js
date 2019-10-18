import axios from 'axios'
import { Message, Loading } from 'element-ui';

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}

axios.interceptors.request.use(config => {
  startLoading()
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
    return config
  }
  return config
}, err => {
  return err
})

axios.interceptors.response.use(res => {
  endLoading()
  return res
}, err => {
  endLoading()
  const status = err.response.status
  if (status == 401) {
    Message.error('登录超时，请重新登录')
    localStorage.removeItem('token')
    vm.$router.replace('/login')
  }
})

export default axios