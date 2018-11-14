require("babel-polyfill")

import Vue from 'vue'
import iView from 'iview'
import App from '@/App'
import '@/utils/axios.config.js'
import router from './router'
import store from './store'
import '@/assets/style/app.less'
import 'iview/dist/styles/iview.css'


router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
});

Vue.use(iView);
Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
