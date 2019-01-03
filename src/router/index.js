import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/cardList',
        component: lazyload('cardList'),
        children: [{
            path: 'cardList',
            name: 'cardList',
            meta: { title: '我的健康卡' },
            component: lazyload('cardList')
        }]
    },{
        path: '/editCard',
        name: 'editCard',
        component: lazyload('editCard'),
        meta: {
            title: '健康卡申请',
            keepAlive: false
        }
    },
    {
        path: '/code',
        name: 'code',
        component: lazyload('code'),
        meta: {
            title: '码信息',
            keepAlive: false
        }
    }
  ]
})
