import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import viewHomepage from "./components/template/view-homepage/index.vue";
import "../src/assets/iconfont/iconfont.scss";
// Vue.use(viewHomepage); // 自定义全局组件的时候需要Vue.use();
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json';
// axios.defaults.headers.get["Content-type"] = "application/json"
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    // use
    Vue.use(mavonEditor)

Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false
//导航栏
Vue.component('view-homepage', viewHomepage);
//ui框架
Vue.use(ElementUI);
Vue.use(Vuex)
VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);
new Vue({
  router,
  store,
  components: {
    App,
    viewHomepage
  },
  render: (h:any) => h(App)
}).$mount("#app");
