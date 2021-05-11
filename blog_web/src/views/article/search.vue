<template>
  <div class="view-search">
    <view-homepage />
    <div class="container">
      <div class="search">
        <img src="../../assets/index/绿植.png" alt="" />
        <div class="search-input">
          搜索结果
        </div>
      </div>
      <BlogList :blogList="searchList" v-if="searchList.length>0"/>
        <div class="noBlog" v-else>没有相关文章，换个关键词试试叭~</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { getSearchList } from "../../api/commentApi";
import BlogList from "./components/cardList.vue";
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
@Component({
  components: { BlogList },
})
export default class extends Vue {

  @Mutation getSearchList:any
  @State searchList:any
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../common.scss";
.view-search {
  @include common;
  padding-top: 100px;
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    
    .search-input {
      font-size: 43px;
         color: $c-medium;
         font-weight: 300;
         letter-spacing: 10px;
    }
  }
  .noBlog{
      text-align: center;
      font-size: 30px;
      color: $c-medium;
      margin-top: 50px;
    }
}
</style>