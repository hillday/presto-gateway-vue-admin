import request from '@/utils/request'

export function getList(useSchema) {
  return request({
    url: '/presto/resourcegroup/read?useSchema=' + useSchema,
    method: 'get'
  })
}

export function addResourceGroup(useSchema,params){
  return request({
    url: '/presto/resourcegroup/create?useSchema=' + useSchema,
    method: 'post',
    data: params
  })
}

export function updateResourceGroup(useSchema,params){
  return request({
    url: '/presto/resourcegroup/update?useSchema=' + useSchema,
    method: 'post',
    data: params
  })
}

export function deleteResourceGroup(useSchema,id){
  return request({
    url: '/presto/resourcegroup/delete/' + id + '?useSchema=' + useSchema,
    method: 'post'
  })
}