<template>
  <div class="view-article">
    <div class="container">
      <div
        class="card"
        v-for="blog in blogList"
        :key="blog.blog_id"
        @click="toBlog(blog)"
      >
        <!-- <div><img :src="topImg" alt=""></div> -->
        <div class="art_title">
          {{ blog.blog_title }}
        </div>
        <!-- <div class="info" >
          <div v-html="blog.blog_html"></div>
        </div> -->
        <div class="art_tag">
          <el-tag class="tabs" v-for="(item, index) in blog.tagList" :key="index">
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
            <!-- <i class="iconfont icon-pinglun"></i>
            <span>{{ blog.blog_like }}</span> -->
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
  private topImg = "";
  private tagList: [];
  @Watch("blogList", { deep: true, immediate: true })
  function(val: any) {
    this.blogList = val;
    this.getTag(this.blogList);
    this.getImg(this.blogList);
  }
  private getTag(list: any) {
    list.forEach((item: any) => {
      if (item.blog_tag) {
        this.tagList = item.blog_tag.split(",");
        // item.$set(item, "tagList",  this.tagList);
        item.tagList = this.tagList
      }
    });
  }
  private getImg(list: any) {
    list.forEach((item: any) => {
      if (item.blog_topImg) {
        this.topImg = item.blog_topImg;
      } else {
        this.topImg =
          "http://127.0.0.1/blog/blog_admin/static/img/1618720522727.png";
      }
    });
  }
  private toBlog(blog: any) {
    this.$router.push({ name: "blog", params: { blog: blog } });
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.view-article {
  background-color: rgba(204, 204, 204, 0);
  .card {
    cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
    height: 100px;
    // box-shadow: 0px 5px 30px rgba(179, 179, 179, 0.1);
    background-color: $c-white;
    border-bottom: 1px solid rgb(238, 238, 238);
    padding: 15px;
    // border-radius: 10px;
    margin-bottom: 20px;
    // border: 1px solid $c-light;
    &:hover {
      // box-shadow: 0px 5px 10px rgba(106, 106, 106, 0.2);
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
      cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
      color: $c-light;
      background-color: $c-white;
      border-color: $c-light;
      height: 25px;
      text-align: center;
      line-height: 23px;
    }
  }
}
</style>