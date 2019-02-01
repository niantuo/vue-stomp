/**
 * @author  tuonina
 * @email  976056042@qq.com
 * @createTime  2019/1/25
 *
 **/
const PREFIX = "N_Q";


export function putItem(key, value) {
  localStorage.setItem(`${PREFIX}_${key}`, value)
}

export function getItem(key) {
  return localStorage.getItem(`${PREFIX}_${key}`)
}

export function removeItem(key) {
  localStorage.removeItem(`${PREFIX}_${key}`)
}
