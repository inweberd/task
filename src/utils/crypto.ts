import CryptoJS from 'crypto-js'

// 对称加密
class aes {

    private readonly iv : CryptoJS.lib.WordArray
    private readonly key: CryptoJS.lib.WordArray

    constructor(key: string, iv: string) {

        this.iv  = CryptoJS.enc.Utf8.parse(iv)
        this.key = CryptoJS.enc.Utf8.parse(key)
    }

    // 加密
    encrypt(text: string): string {

        const encrypted = CryptoJS.AES.encrypt(text, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })

        return encrypted.toString()
    }

    // 解密
    decrypt(text: string): string {

        const decrypted = CryptoJS.AES.decrypt(text, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })

        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}

// 生成指定长度的加密字符串
export const Token = (value: string = '', length: number = 32, prefix: string = ''): string => {

    const text     = prefix + value

    // 计算MD5哈希值
    const MD5Hash  = CryptoJS.MD5(text).toString()

    let result     = MD5Hash.substring(0, length)

    // 计算 result 长度是否满足要求
    while (result.length < length) {
        result += Token(result, length - result.length)
    }

    return result
}

export const Aes = (key: string, iv: string) => new aes(key, iv)
