/**
 * @author  tuonina
 * @email  976056042@qq.com
 * @createTime  2019/1/25
 * 相关的请求方法
 **/
import request from '../utils/request'

/**
 * 获取微信的用户信息
 * {name:xx,tel:xx,card:xx,company:xx}
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
export function getUserInfo(data) {
  return request({
    url: 'jcapi2/addUser',
    method: 'post',
    data: data
  }).then(({data}) => data)
}


export function queryHasInfo() {
  return request({
    url: 'jcapi2/has_msg',
  }).then(({data}) => data)
}

/**
 * 获取奖品信息
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
export function queryPrizeList() {
  return request({
    url: 'jcapi2/join'
  }).then(resp => resp.data)
}
