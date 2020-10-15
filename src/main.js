import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from "./service/index";

import './plugins/element.js'
import './plugins/markdown.js'


Vue.config.productionTip = false
Vue.prototype.$service = service;

service.isAdmin().then(res => {
    if (res.data.code === 0) {
        store.commit('setIsAdmin', res.data.data)
    }
})

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
