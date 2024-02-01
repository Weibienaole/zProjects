export function isvalidUsername(str) {
  // 账户名数组
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
// 校验是否是地址
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
