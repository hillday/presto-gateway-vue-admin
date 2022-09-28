import request from '@/utils/request'

export function getListWithResourceGroupId(useSchema, id) {
  return request({
    url: '/presto/selector/read/' + id + '?useSchema=' + useSchema,
    method: 'get'
  })
}

export function addSelector(useSchema,params){
  return request({
    url: '/presto/selector/create?useSchema=' + useSchema,
    method: 'post',
    data: params
  })
}

export function updateSelector(useSchema,params){
  return request({
    url: '/presto/selector/update?useSchema=' + useSchema,
    method: 'post',
    data: params
  })
}

export function deleteSelector(useSchema,params){
  return request({
    url: '/presto/selector/delete/?useSchema=' + useSchema,
    method: 'post',
    data: params
  })
}