import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

// 获取好友
export const getFriend = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/friend/friendList`,
      data: params
    }).then(res => res.data)
  }

  // 获取聊天信息
export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}

export const getRecomRouteMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/route/routeRecom`,
    // baseURL: `${baseUrl}/gpt_routing/v10`,
    data: { req_body: params}
  }).then(res => res)
}

export const getAdjustRouteMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/route/routeAdjust`,
    data: params
  }).then(res => res)
}