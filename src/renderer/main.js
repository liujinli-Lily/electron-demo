import Vue from 'vue';
// import 'element-ui/lib/theme-chalk/index.css';
/* eslint-disable */
import './assets/theme/index.css';
import Element from 'element-ui';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.use(Element);

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
}).$mount('#app');
