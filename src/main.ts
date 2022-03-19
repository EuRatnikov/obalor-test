import Vue from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router'
import store from './store'
// @ts-ignore
import vuetify from './plugins/vuetify'
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false
Vue.use(AsyncComputed);

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
