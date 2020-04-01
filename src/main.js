import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Buefy from 'buefy'
import VueLazyload from 'vue-lazyload'

Vue.use(Buefy);
Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store

}).$mount('#app');
