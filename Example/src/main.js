// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

/**
 * 每一个路由页面跳转都会触发该方法
 */
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});


