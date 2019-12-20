import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$IconColor = '#1E59C1'

Vue.filter('truncateString', (value, chars=50)=>{
  let final = value.length>chars?'...':'';
  return value.substr(0, chars)+final
})

Vue.filter('stripHTML', value=>{
  return value.replace(/<(.|\n)*?>/g, '');
})

// format yyyy-mm-dd'T'HH:ii:ss.SSS'Z' to dd-mm-yy HH:ii:ss
Vue.filter('timestampFormat', (value)=>{
    let date = new Date(value);
    return date.toLocaleString();
})

Vue.filter('mapServiceName', (value)=>{
  switch (value) {
    case 'citfac':
      return 'Avvisi sui nuovi servizi con notifica'
    default:
      return 'MACHI'
  }
})

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.commit('persistent/initializeStore');
  },
  render: h => h(App)
}).$mount('#app')
