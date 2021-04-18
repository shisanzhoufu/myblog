<template>
  <div class="view-blog">
    <view-homepage />
    <div class="container">
      <div class="card">
        <div class="blog_title">
          <img src="../../assets/index/pinkmoon.png" alt="" />
          <span>{{ blog.blog_title }}</span>
        </div>
        <div class="blog_info" v-html="blog.blog_html"></div>
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
  * {
    // font-size: 16px
    line-height: 32px;
    color: rgb(102, 102, 102);
    background-color: $c-white;
    
  }
  @include common;
.blog_info{
  p{
    img{
    display: block;
    margin: 1rem auto;
    width: auto;
    height: auto;
    max-width: 92%;
    max-height: 600px;
    border-radius: .2rem;
    box-shadow: 0 2px 0.5rem rgb(0 0 0 / 12%);
    transition: .4s;
  }}
}
  .card {
    min-height: 600px;
    padding: 10px;
    padding-top: 100px;

    .blog_title {
      display: flex;
      justify-content: center;
      padding-bottom: 40px;
      border-bottom:1px solid rgb(220, 218, 218);
      align-items: center;
      img {
        width: 100px;
        height: auto;
      }
      span {
        font-size: 38px;
        color: $c-medium;
        font-weight: 300;
        letter-spacing: 8px;
      }
    }
  }
}
</style>