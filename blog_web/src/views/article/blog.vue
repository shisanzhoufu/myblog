<template>
  <div class="view-blog">
    <view-homepage />
    <div class="container">
      <div class="card">
        <div class="blog_title">
          <img src="../../assets/index/玫瑰.png" alt="" />
          <span>{{ blog.blog_title }}</span>
        </div>
        <div v-html="blog.blog_html"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  private blog: any;
  created() {
    this.blog = this.$route.params.blog;
    console.log(this.$route.params.blog);
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../common.scss";
.view-blog {
  *{
    font-size: 20px;
    line-height: 30px;
    color: rgb(58, 58, 58);
  }
  @include common;
  .card {
    padding-top: 100px;
    .blog_title {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
      }
      span {
        font-size: 43px;
        color: $c-medium;
        font-weight: 300;
        letter-spacing: 10px;
      }
    }
  }
}
</style>