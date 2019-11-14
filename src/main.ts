import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMqtt from 'vue-mqtt'

Vue.config.productionTip = false
Vue.use(VueMqtt, 'wss://mqtt.devbit.be')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
