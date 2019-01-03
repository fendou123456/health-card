import { cache, cacheKey, post, apis } from './index'
import store from '@/store/index'
import * as types from '@/store/mutation-types'
import axios from 'axios'
import router from '@/router'


const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
    /**
     * 刚进入程序初始化
     */
const init = () => {
    let userInfo = cache.get(cacheKey.userInfo)
    if (userInfo) {
        // store.commit(types.SET_USER_INFO, userInfo)
    }
    router.beforeEach((to, from, next) => {
        if (to.query.appCode) {
            cache.set(cacheKey.system_appid, to.query.appCode)
        }
        if (from.fullPath === '/' && to.path !== '/login') {
            const toLogin = () => {
                let fullPath = to.path;
                for (let x in to.query) {
                    if (x != 'token') {
                        if (fullPath.indexOf('?') > -1) {
                            fullPath += `&${x}=${to.query[x]}`
                        } else {
                            fullPath += `?${x}=${to.query[x]}`
                        }
                    }
                }
                cache.set(cacheKey.after_login_url, fullPath);
                router.replace('/login?source=init')
            }
            if (to.query.token) {
                beforeToSystem(to).then(res => {
                    next()
                }, err => {
                    if (to.meta.noLogin) {
                        next();
                        return;
                    }
                    toLogin()
                })
            } else {
                if (userInfo) {
                    next();
                } else {
                    if (to.meta.noLogin) {
                        next();
                        return;
                    }
                    toLogin();
                }
            }
        } else {
            next();
        }
    })
    router.afterEach(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
    axios.interceptors.request.use(
        config => {
            // if (store.state.userInfo) {
            //     if (!config.headers.token) {
            //         config.headers.token = store.state.userInfo.token;
            //     }
            // }
            return config
        }
    )
}
const beforeToSystem = (page) => {
    return new Promise((resolve, reject) => {
        post({
            isLoading: true,
            url: apis.login,
            token: page.query.token,
            param: { appid: cache.get(cacheKey.system_appid) }
        }).then(res => {
            // cache.set(cacheKey.userInfo, res.data);
            // store.commit(types.SET_USER_INFO, res.data);
            resolve()
        }, err => {
            reject()
        })
    })

}

const GetQueryString = function(url, name) {
    let search = url.split('?')[1];
    let ta = search.split('&');
    for (let i = 0; i < ta.length; i++) {
        let item = ta[i];
        let ta2 = item.split(name + '=');
        if (ta2.length == 2) {
            return ta2[1];
        }
    }
    return null;
}
const isWeiXin = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

const isIOS = () => {
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

const isAndroid = () => {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

export {
    init,
    GetQueryString,
    lazyload,
    isWeiXin,
    isIOS,
    isAndroid
}