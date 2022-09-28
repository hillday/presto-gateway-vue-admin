import request from '@/utils/request'

export function getList() {
  return request({
    url: '/entity/GATEWAY_BACKEND',
    method: 'get'
  })
}

export function addOrUpdateBackend(params){
  return request({
    url: '/entity?entityType=GATEWAY_BACKEND',
    method: 'post',
    data: params
  })
}