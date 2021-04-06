import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus  from 'element-plus';
import 'element-ui/lib/theme-chalk/index.css';
import viewHomepage from "./components/template/view-homepage/index.vue";
import "../src/assets/iconfont/iconfont.scss";
// Vue.use(viewHomepage); // 自定义全局组件的时候需要Vue.use();
import axios from 'axios'
import VueAxios from 'vue-axios'

// axios.defaults.headers.get["Content-type"] = "application/json"
Vue.use(VueAxios, axios)
// Vue.prototype.axios=axios;
axios.defaults.baseURL = '/api'
// axios.defaults.withCredentials=true;
Vue.config.productionTip = false
//导航栏
Vue.component('view-homepage', viewHomepage);
//ui框架
Vue.use(ElementPlus );

new Vue({
  router,
  store,
  components: {
    App,
    viewHomepage
  },
  render: (h:any) => h(App)
}).$mount("#app");
