import Vue from "vue";
import Vuex from "vuex";
import { axiosGet } from "../api/axiosApi";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    commentList:[]
  },
  mutations: {
    setCommentList(state:any,list:any){
      state.commentList = list
    }
  },
  actions: {
    
  },
  modules: {}
});
