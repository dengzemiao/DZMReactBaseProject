import axios from './axios'

// 服务器代理地址
const BASE_URL = process.env.REACT_APP_BASE_URL

// ================================= 《 公 共 》

// 请求案例（Get）
export function getDemo(parameter?: Record<string, any>) {
  return axios({
    // url: 'https://test-api.juhaokanya.com/api/user/config_name_new',
    url: BASE_URL + '/user/config_name_new',
    method: 'get',
    params: parameter
  })
}
