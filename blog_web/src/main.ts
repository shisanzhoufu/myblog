import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import viewHomepage from "./components/template/view-homepage/index.vue";
import "../src/assets/iconfont/iconfont.scss";
// Vue.use(viewHomepage); // 自定义全局组件的时候需要Vue.use();
 
Vue.component('view-homepage', viewHomepage);
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  components: {
    App,
    viewHomepage
  },
  render: h => h(App)
}).$mount("#app");
