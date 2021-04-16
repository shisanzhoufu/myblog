<template>
  <div class="view-article">
    <div class="container">
      <div
        class="card"
        v-for="blog in blogList"
        :key="blog.blog_id"
        @click="toBlog(blog)"
      >
        <div class="art_title">
          {{ blog.blog_title }}
        </div>
        <div class="art_tag">
          <el-tag class="tabs" v-for="(item, index) in tagList" :key="index">
            {{ item }}
          </el-tag>
        </div>
        <div class="art_info">
          <!-- <i class="iconfont icon-biaoqian"></i> -->
          <div>{{ blog.blog_create_date }}</div>
          <div class="icon_info">
            <i class="iconfont icon-liulan1"></i>
            <span>{{ blog.blog_look }}</span>
            <i class="iconfont icon-dianzan"></i>
            <span>{{ blog.blog_like }}</span>
            <i class="iconfont icon-pinglun"></i>
            <span>{{ blog.blog_like }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
// import { Warning, Success, Error } from "../../../api/message";
// import { axiosPost, axiosGet, formatDateTime } from "../../../api/axiosApi";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop(Array) blogList!: any;
  private List: any;
  private tagList: [];
  @Watch("blogList", { deep: true, immediate: true })
  function(val: any) {
    console.log(val,'val000099')
    this.blogList = val
    this.getTag(this.blogList);
  }
  private getTag(list: any) {
    list.forEach((item: any) => {
      if (item.blog_tag) {
        this.tagList = item.blog_tag.split(",");
      }
    });
  }
  // get startTime(){
  //   console.log(this.List,"get")
  //   return this.List
  // }
  private toBlog(blog: any) {
    this.$router.push({ name: "blog", params: { blog: blog } });
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.view-article {
  @include common;
  .card {
    cursor: pointer;
    margin-top: 50px;
    width: 100%;
    height: 100px;
    // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    // border-radius: 10px;
    margin-bottom: 50px;
    border: 1px solid $c-light;
    &:hover {
      // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }
    .art_title {
      font-size: 30px;
      //   color: $c-medium;
      font-weight: 400;
      letter-spacing: 4px;
    }
    .art_info {
      display: flex;
      margin: 10px 0px;
      font-size: 18px;
      color: $c-medium;

      .iconfont {
        margin-top: 4px;
      }
      .icon_info {
        line-height: 20px;
        margin-left: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          padding: 0 8px;
        }
        .icon-liulan1 {
          font-size: 21px;
        }
        i {
          margin-left: 16px;
          text-align: center;
        }
      }
    }
    // .art_tag{
    //     .el-tag--dark {
    //   background-color: $c-white;
    //   border-color: $c-light;
    //   color: $c-light;
    //   font-size: unset;
    // }

    // .el-icon-close:before {
    //   color: $c-light;
    //   background-color: $c-white;
    // }
    .art_tag {
      margin: 15px 0px;
      display: flex;
      width: 300px;
    }
    .el-tag {
      width: 50px;
      margin-right: 10px;
      cursor: pointer;
      color: $c-light;
      background-color: $c-white;
      border-color: $c-light;
      height: 25px;
      text-align: center;
      line-height: 25px;
    }
  }
}
</style>