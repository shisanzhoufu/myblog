<template>
  <div class="manege-blog" id="me">
    <div class="container">
      <div class="card" v-for="blog in blogList" :key="blog.blog_id">
        <div class="art_title">
          {{ blog.blog_title }}
        </div>
        <div class="art_tag">
          <el-tag
            class="tabs"
            v-for="(item, index) in blog.tagList"
            :key="index"
          >
            {{ item }}
          </el-tag>
        </div>
        <div class="art_info">
          <div>{{ blog.blog_create_date }}</div>
          <div class="icon_info">
            <i class="iconfont icon-liulan1"></i>
            <span>{{ blog.blog_look }}</span>
            <i class="iconfont icon-dianzan"></i>
            <span>{{ blog.blog_like }}</span>
          </div>
        </div>
        <div class="change">
          <div class="pro-list editor" @click="toChange(blog)">编辑</div>
          <div class="pro-list look" @click="toBlog(blog)">浏览</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { getBlog } from "../../../api/commentApi";
@Component
export default class extends Vue {
  private blogList = [];
  private tagList = [];
  created() {
    getBlog((res: any) => {
      if (res.statusCode === 200) {
        this.blogList = res.commentList;
        this.blogList = this.blogList.reverse();
      }
      this.getTag();
    });
  }
  private getTag() {
    this.blogList.forEach((item: any) => {
      if (item.blog_tag) {
        this.tagList = item.blog_tag.split(",");
        item.tagList = this.tagList;
      }
    });
  }
  private toBlog(blog: any) {
    this.$router.push({ name: "blog", params: { blog: blog } });
  }
  private toChange(blog: any) {
    this.$router.push({ name: "change", params: { blog: blog } });
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";

.manege-blog {
  .card {
    cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
      auto;
    position: relative;
    height: 100px;
    box-shadow: 0px 5px 30px rgba(179, 179, 179, 0.1);
    background-color: $c-white;
    padding: 15px;
    // border-radius: 10px;
    margin-bottom: 20px;
    // border: 1px solid $c-light;
    &:hover {
      box-shadow: 0px 5px 10px rgba(106, 106, 106, 0.2);
    }

    .art_title {
      font-size: 25px;
      //   color: $c-medium;
      font-weight: 400;
      letter-spacing: 4px;
    }
    .art_info {
      display: flex;
      margin: 10px 0px;
      font-size: 14px;
      color: $c-medium;
      .icon_info {
        line-height: 18px;
        margin-left: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          padding: 0 8px;
        }
        .icon-liulan1 {
          font-size: 20px;
        }
        i {
          margin-left: 16px;
          text-align: center;
        }
      }
    }
    .art_tag {
      margin: 15px 0px;
      display: flex;
      width: 300px;
    }
    .el-tag {
      width: 50px;
      margin-right: 10px;
      color: $c-light;
      background-color: $c-white;
      border-color: $c-light;
      height: 25px;
      text-align: center;
      line-height: 23px;
    }
    .change {
      position: absolute;
      bottom: 10px;
      right: 20px;
      display: flex;
      .pro-list {
        text-decoration: none;
        margin-left: 5px;
        color: $c-medium;
      }
    }
  }
}
</style>