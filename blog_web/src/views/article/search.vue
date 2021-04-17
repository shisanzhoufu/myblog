<template>
  <div class="view-search">
    <view-homepage />
    <div class="container">
      <div class="search">
        <img src="../../assets/index/绿植.png" alt="" />
        <div class="search-input">
          搜索结果
          <!-- <input
            type="text"
            placeholder="输入关键词搜索"
            v-model="searchInfo"
            @keyup.enter="getList()"
          /> -->
          <!-- <i class="el-icon-close icon-close"></i> -->
        </div>
      </div>
      <BlogList :blogList="searchList" />
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

    //   input {
    //     height: 35px;
    //     margin: 0 15px;
    //     background-image: none;
    //     border: none;
    //     outline: none;
    //     font-size: 25px;
    //     line-height: 30;
    //     width: 80%;
    //   }
    // }
    // .icon-close {
    //   display: none;
    // }
    // &:focus {
    //   input {
    //     border: none;
    //     outline: none;
    //   }

    //   .icon-close {
    //     display: block;
    //   }
    }
  }
}
</style>