import './plugins/vuex'
import Vue from 'vue'
import VueRouter from "vue-router";
import VueMeta from 'vue-meta';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import store from './store'
import routes from "./routes";
import App from "./App";
import i18n from './i18n'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMeta);
Vue.use(i18n);
UIkit.use(Icons);

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes: routes
});

/**
 * Initiate correct language based route name
 */
router.beforeEach((to, from, next) => {
  // Get locale from path
  let localeUrlSegment = to.path.split('/')

  if (localeUrlSegment) 
    localeUrlSegment = localeUrlSegment[1];
  else 
    localeUrlSegment = "";

  if (localeUrlSegment && localeUrlSegment.length == 2 && localeUrlSegment != i18n.locale) 
    store.dispatch('setLanguage', localeUrlSegment);  // Switch language if a route was specified

  if(localeUrlSegment.length == 0 )
    next('/' + store.getters.language);// Redirect to last known language
  else
    next();  // Move on the next hook (render component view)
})

import VueGtag from "vue-gtag"
Vue.use(VueGtag, {
  config: { id : "UA-164934534-1"}
},router)

new Vue({
  render: h => h(App),
  i18n,
  store,
  router
}).$mount('#app');