// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import store from './store/index'
import { logger, date, cache, cacheKey, validate, widget, post, get, apis, util } from './utils/index'
import '@/assets/iconfont/iconfont.css'
import '@/assets/sass/sass_index.scss';
import { init } from "@/utils/common";

import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)

Vue.config.productionTip = false

FastClick.attach(document.body)

// init();

// Vue.use(ZJFilter);

//打日志console.log, 发布环境会过滤
Vue.prototype.$log = logger.log
    //日期util，可以自己往里面添方法
Vue.prototype.$date = date
    //wx缓存
Vue.prototype.$cache = cache
    //缓存的key,最好key列表管理起来，搭配cache使用
Vue.prototype.$cacheKey = cacheKey
    //一些验证的方法，没有的自己往里面加
Vue.prototype.$validate = validate
    //wx弹出框，toast,toastSuccess,alert,confirm, 别的也可以往里面加
Vue.prototype.$widget = widget
    //post请求
Vue.prototype.$post = post
    //get请求
Vue.prototype.$get = get
    //接口列表，搭配post使用，
Vue.prototype.$apis = apis

Vue.prototype.$util = util
/* eslint-disable no-new */
window.RootVue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

import { Dialog } from 'vant';
import { Toast } from 'vant';
import { Button } from 'vant';
import { PullRefresh } from 'vant';
import { Row, Col } from 'vant';
import { List } from 'vant';
import { Checkbox } from 'vant';
import { Popup } from 'vant';//use
import { Field } from 'vant';
import { Search } from 'vant';
import { NumberKeyboard } from 'vant';//use
import { Tabbar, TabbarItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { TreeSelect } from 'vant';
import { Uploader } from 'vant';
import { SwipeCell } from 'vant';
import { CheckboxGroup } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { SwitchCell } from 'vant';
import { Switch } from 'vant';
import { Picker } from 'vant';
import { Actionsheet } from 'vant';

Vue.use(Actionsheet);
Vue.use(Switch);
Vue.use(SwitchCell);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(CheckboxGroup);
Vue.use(SwipeCell);
Vue.use(Cell).use(CellGroup);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(NumberKeyboard);
Vue.use(Field);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Row).use(Col);
Vue.use(List);
Vue.use(Checkbox);
Vue.use(List);
Vue.use(Search);
Vue.use(List);
Vue.use(TreeSelect);
Vue.use(Uploader)
Vue.use(Picker)