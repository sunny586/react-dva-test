import request from '@/utils/request'

// 列表数据接口
export const queryAppListDataApi = params =>
  request({
    url: '/list',
    params,
    method: 'get'
  })

// 获取推荐的数据 recomendData
export const queryRecomendDataApi = params =>
  request({
    url: '/recomend',
    params,
    method: 'get'
  })
