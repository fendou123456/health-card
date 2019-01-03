import { Base64 } from 'js-base64'

/**
 * 可以加入base64加密，暂时不做处理
 */

/**
 *  一些静态的key放在这里统一管理
 */
export const cacheKey = {
    // userInfo: 'user_info',
    userId:'userId',
    openId:'openId',
    hospitalId:'hospitalId',
    projectId:'projectId',
    cardNumber:'cardNumber'
}

export const cache = {
    set(key, value) {
        let data = JSON.stringify(value)
        if (process.env.NODE_ENV === 'production') {
            data = Base64.encode(data)
        }
        sessionStorage.setItem(key, data)
    },
    get(key) {
        let data = sessionStorage.getItem(key)
        if (!data) return null
        if (process.env.NODE_ENV === 'production') {
            data = Base64.decode(data)
        }
        let t = data ? JSON.parse(data) : null
        return t
    },
    remove(key) {
        sessionStorage.removeItem(key)
    }
}