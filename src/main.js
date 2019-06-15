import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './css/reset.styl'
import 'babel-polyfill'

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App></App>'
})


