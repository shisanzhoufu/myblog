<template>
  <div class="view-index">
    <view-homepage />
    <div class="card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="生活" name="first"><Life/></el-tab-pane>
          <el-tab-pane label="兴趣" name="second"><Interest/></el-tab-pane>
          <el-tab-pane label="技术" name="third"><Technology/></el-tab-pane>
        </el-tabs>
    </div>
    <!-- <PageArticle/> -->
    <!-- <PageIntrest/> -->
  </div>
</template>
<style lang="scss">
@import "src/base.scss";
@import "../common.scss";
.view-index {
  @include common;
  .card {
   .el-tabs {
      // background-color: $c-white;
      padding-top: 30px;
     padding-left: 5px;
      
    }
    .is-active {
      color: $c-main;
      cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
        auto;
    }
    .el-tabs__header{
 height: 80px;
    }
    .el-tabs__nav {
      z-index: 0;
    }
    .el-tabs__nav-wrap::after {
      z-index: -1;
    }
    .el-tabs__item {
      cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
        auto;
font-size: 23px;
      &:hover {
        color: $c-main;
      }
    }
    .el-tabs__active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: $c-main;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      list-style: none;
    }
  }
}
</style>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import CardList from "./components/cardList.vue";
import PageTop from "./components/page-top.vue";
import Life from "./components/life"
import Technology from "./components/technology"
import Interest from "./components/interest"
// import PageArticle from "./components/page-article.vue";
@Component({
  components: { CardList, PageTop,Life,Technology,Interest },
})
export default class extends Vue {
   private activeName = "first";
  underStyle: any = {};
  private types: any;
  created() {
    const under = document.getElementsByClassName("view-index__under")[0];
    if (under) {
      this.underStyle = {
        // 总宽度-单个page的宽度
        bottom: -under.clientHeight + 600 + "px",
        position: "sticky",
      };
    }
    this.types = this.$route.query.types;
  }
}
</script>

