import axios from 'axios'
import { logger, widget, cache } from './index'
import store from '@/store/index'
import router from '@/router'

export const setURL = (url, args) => {
    if (typeof url === 'undefined') { throw 'no url!' }
    if (!args) return url
    for (var i = 0; i < args.length; i++) {
        if (url.indexOf('{?}') < 0) { break }
        url = url.replace(/\{\?\}/, args[i] + '')
    }
    // 最后是否有/{?}
    if (url.lastIndexOf('/{?}') > -1) {
        url = url.substr(0, url.lastIndexOf('/{?}'))
    }
    return url
}

const postBase = {
    // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
    url: '/post',
    // 请求方法同上
    method: 'post', // default
    // 请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
            // 'Content-Type': 'application/json;charset=UTF-8'
    },
    // 设置超时时间
    timeout: 500000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // default
    // 返回数据类型
    responseType: 'json' // default
}

const postBaseResponseText = {...postBase, responseType: 'text' }

const postBaseJsontype = {...postBase,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

const postFile = {...postBase,
    timeout: 1800000,
    // 请求头信息
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
        'Content-Type': 'multipart/form-data'
    }
}

const postResArraybuffer = {...postBase,
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 返回数据类型
    responseType: 'arraybuffer'
}


/**
 * option {
    isLoading: boolean true 菊花， false， 没有菊花（ 相当于无声请求）
    loadingText: 请稍等...
    url: '' //可以传apiurl中的key, 也可以传整个url
    param: 作为post数据传过去，json对象或者字符串, 如果是字符串那么可能是body形式传过去，
    requestParam: 接口名称中可能会有参数 []从数组中传过来,
    method: //默认POST,
    postType: '默认x-www-form-urlencoded', 'json': 'application/json',
    token: 测试用的token
  }
  返回 Promise
 */
export const post = (option) => {
    let url = setURL(option.url, option.requestParam)
    let hasLoading = option.isLoading
    if (hasLoading) {
        widget.hideLoading();
        widget.loading()
    }
    let postType = postBase
    if (option.postType === 'text') {
        postType = postBaseResponseText
    } else if (option.postType === 'json') {
        postType = postBaseJsontype
    } else if (option.postType === 'file') {
        postType = postFile
    } else if (option.postType === 'arraybuffer') {
        postType = postResArraybuffer
    }
    let param = option.param || {}
    param.source = cache.get('source')||''
    if (option.param) {
        if (typeof option.param === 'string') {
            param = option.param
        } else {
            if (option.postType === 'json' || option.postType === 'file') {
                param = option.param
            } else {
                param = new URLSearchParams()
                for (let x in option.param) {
                    param.append(x, option.param[x])
                }
            }
        }
    }
    let method = option.method ? option.method : 'post'
    if (option.token) {
        postType.headers['token'] = option.token
    }
    return new Promise((resolve, reject) => {
        axios[method](url, param, postType).then((response) => {
            if (hasLoading) {
                widget.hideLoading();
            }
            console.log(">>>>>>>>>>>",response)
            if (response.status === 200) {
                if (response.data.code == 200) {
                    resolve(response.data)
                } else {
                    // if (response.data.code == 430) {
                    //     cache.remove('user_info')
                    //     store.commit('SET_USER_INFO', null)
                    //     widget.alert('登录过期，请重新登录').then(() => {
                    //         router.push('/login');
                    //     })
                    // } else if (hasLoading) {
                    //     widget.toastWarn(response.data.message)
                    // }
                    reject(response)
                }
            } else {
                if (hasLoading) {
                    widget.toastWarn('网络异常')
                }
                reject(response)
            }
            logger.log('=====>' + url + '<=======')
            logger.log(param)
            logger.log(response.data)
        }).catch((error) => {
            if (hasLoading) {
                widget.hideLoading();
                widget.toastWarn('网络异常');
            }
            reject(error || {})
            logger.log('=====>' + url + '<=======')
            logger.log(param)
            logger.log(error)
        })
    })
}

export const get = (option) => {
    option.method = 'get'
    return post(option)
}