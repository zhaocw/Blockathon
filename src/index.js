import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import App from './App.vue';

import Contract from './pc/contract.vue'
import Mobile from './mobile/index.vue'
import MobileDetail from './mobile/detail.vue'
import MobileApply from './mobile/apply.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  { path: '/', component: Contract },
  { path: '/contract', component: Contract },
  { path: '/contract/detail/:id', component: Contract },
  { path: '/mobile', component: Mobile },
  { path: '/mobile/detail/:id', component: MobileDetail },
  { path: '/mobile/apply/:id/:status', component: MobileApply },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})



new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
