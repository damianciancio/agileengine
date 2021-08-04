import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import authSetup from './services/auth-setup';
import FullpageModal from 'vue-fullpage-modal';
import panZoom from 'vue-panzoom';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import Clipboard from 'v-clipboard';

Vue.use(Clipboard);
Vue.use(FullpageModal);
Vue.use(panZoom);


authSetup();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
