import cache from 'lscache'
import { Token, Aes } from '@/utils/crypto.ts'

const IV    = Token('task-iv', 16, 'cache')
const KEY   = Token('task-key', 16, 'cache')
const AES   = Aes(KEY, IV)
// 是否加密 - 生产环境下加密
const { PRO }   = import.meta.env
// 缓存前缀
const prefix    = '[task]'
const GetKey = (key: string) => prefix + key

export default {
    get: (key: string) => {
        const value = cache.get(GetKey(key))
        if (value) return value
        if (!PRO)  return value
        try {
            return JSON.parse(AES.decrypt(value))
        } catch (e) {
            cache.remove(GetKey(key))
            return null
        }
    },
    set: (key: string, value: any, second: number = 0) => {
        if (!PRO) return cache.set(GetKey(key), value, second)
        cache.set(GetKey(key), AES.encrypt(JSON.stringify(value)), second)
    },
    has: (key: string) => cache.get(GetKey(key)),
    del: (key: string) => cache.remove(GetKey(key)),
    clear: cache.flush,
    key: GetKey
}