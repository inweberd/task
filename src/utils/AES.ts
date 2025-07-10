import CryptoJS from 'crypto-js'

// 对称加密
class AES {
  iv: string
  key: string
  constructor(key, iv) {
    this.iv = CryptoJS?.enc.Utf8.parse(iv)
    this.key = CryptoJS?.enc.Utf8.parse(key)
  }

  // 加密
  encrypt(text) {
    const item = CryptoJS?.AES.encrypt(text, this.key, {
      iv: this.iv,
      mode: CryptoJS?.mode.CBC,
      padding: CryptoJS?.pad.Pkcs7
    })
    return item.toString()
  }

  // 解密
  decrypt(text) {
    const item = CryptoJS?.AES.decrypt(text, this.key, {
      iv: this.iv,
      mode: CryptoJS?.mode.CBC,
      padding: CryptoJS?.pad.Pkcs7
    })
    return item.toString(CryptoJS?.enc.Utf8)
  }
}

// 生成指定长度的加密字符串
const token = (value = '', length = 32, prefix = '') => {
  const text = prefix + value

  // 计算MD5哈希值
  const MD5Hash = CryptoJS?.MD5(text).toString()

  let result = MD5Hash.substring(0, length)

  // 计算 result 长度是否满足要求
  while (result.length < length) {
    result += token(result, length - result.length)
  }

  return result
}

// 根据ASCII排序
const ASCII = (params) => {
  const keys = Object.keys(params).sort()

  let item = ''
  keys.forEach((key) => {
    const val = params[key]
    if (key.length > 0 && String(val).length > 0) {
      item += `${key}=${val}&`
    }
  })

  if (item.length > 0) item = item.slice(0, -1)

  return item
}

export { token, AES, ASCII }
