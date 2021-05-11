<template>
  <div class="view-manage">
    <view-homepage />
    <div class="container">
      <div class="card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="文章管理" name="first"><BlogPage /></el-tab-pane>
          <el-tab-pane label="用户管理" name="second"><UserPage /></el-tab-pane>
          <el-tab-pane label="留言管理" name="third"
            ><CommentPage
          /></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BlogPage from "./components/blog.vue";
import UserPage from "./components/user.vue";
import CommentPage from "./components/comment.vue";
// import { Warning, Message } from "../../api/message";
// import { axiosPost, logout } from "../../api/axiosApi";
// import { loginInfo } from "../../api/commentApi";
@Component({
  components: { BlogPage, UserPage, CommentPage },
})
export default class extends Vue {
  private activeName = "first";
  private handleClick(tab: any, event: any) {
    console.log(tab, event);
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
@import "../common.scss";
.view-manage {
  @include common;
  cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/pointer.cur),
    auto;
  .card {
    .el-tabs {
      // background-color: $c-white;
      padding-top: 30px;
      margin-left: 10px;
    }
    .is-active {
      color: $c-main;
      cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
        auto;
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