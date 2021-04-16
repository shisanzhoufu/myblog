import Vue from "vue";
import Vuex from "vuex";
import { axiosGet } from "../api/axiosApi";
Vue.use(Vuex);


// export default new Vuex.Store({
//   state: {
//     //评论列表
//     commentList:[],
//     //搜索结果
//     searchLIst:[]
//   },
//   changeSearchLIst:{
//    selectOption (state, tips) {
//       state.tips = tips
//       setTimeout(() => {
//         state.tips.show = false
//       }, 1500)
//     }
// })
export default new Vuex.Store({
  state: {
    //评论列表
    commentList:[],
    //搜索结果
    searchList:[]
  },
  mutations: {
    setCommentList(state:any,list:any){
      state.commentList = list
    },
    setSearchList(state:any,list:any){
      state.searchList = list
    },
    getSearchList: function (state) {
      return state.searchList;  //返回目前的城市名称
    }
  },
  actions: {
    
  },
  // getters:{
  //   getSearchList: function (state) {
  //     return state.searchLIst;  //返回目前的城市名称
  //   }
  // },
  modules: {}
});
