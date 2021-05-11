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
      <div class="dianzan" :class="isLike === true ? 'likes' : ''">
        <div class="like" @click="likeClick">
          <i class="iconfont icon-dianzan"></i>
          <!-- <span class="like-num">{{ like > 0 ? like + "人赞" : "赞" }}</span> -->
        </div>
      </div>
      <el-backtop></el-backtop>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Warning } from "../../api/message";
import { axiosPost, axiosGet, formatDateTime } from "../../api/axiosApi";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import {
  setLikeStatus,
  getLikeStatus,
  setLookStatus,
} from "../../api/commentApi";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  private blog: any;
  private flag = false;
  private isLike = false;
  private item = [];
  private userInfo: any;
  created() {
    this.blog = this.$route.params.blog;
    // this.isLike='';
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const data1 = {
      blogid: this.blog.blog_id,
    };
    setLookStatus(data1);
    const data = {
      userid: this.userInfo.user_id,
      blogid: this.blog.blog_id,
    };
    getLikeStatus(data, (res: any) => {
      if (res.statusCode === 200) {
        if (res.status !== null) {
          this.isLike = res.status;
        } else {
          this.isLike = this.blog.isLike;
        }
      } else {
        this.isLike = this.blog.isLike;
      }
    });
  }
  private getComment() {
    this.flag = true;
  }
  private likeClick = lodash.debounce(this.like, 1000);

  private like() {
    if (this.userInfo) {
      if (this.blog.isLike === null) {
        Vue.$set(this.blog, "isLike", true);
        this.isLike = true;
        this.blog.blog_like++;
      } else {
        if (this.isLike) {
          this.blog.blog_like--;
        } else {
          this.blog.blog_like++;
        }
        this.isLike = !this.isLike;
      }
      this.$forceUpdate();
      const data = {
        userid: this.userInfo.user_id,
        blogid: this.blog.blog_id,
        status: this.isLike,
        bloglike: this.blog.blog_like,
      };
      setLikeStatus(data, (res: any) => {
        console.log(res);
      });
    } else {
      Warning(this, "登录后就可以点赞哦~");
      return;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../common.scss";
.view-blog {
  // @include common;
  margin-left: 26%;
  * {
    // font-size: 16px
    line-height: 32px;
    color: rgb(102, 102, 102);
    background-color: $c-white;
  }
  .container {
    margin: 0px;
    
    .blog_info {
      p {
        img {
          display: block;
          margin: 1rem auto;
          width: auto;
          height: auto;
          max-width: 92%;
          max-height: 600px;
          border-radius: 0.2rem;
          box-shadow: 0 2px 0.5rem rgb(0 0 0 / 12%);
          transition: 0.4s;
        }
      }
    }
    .card {
      min-height: 600px;
      padding: 0 90px;
      padding-top: 50px;

      .blog_title {
        display: flex;
        justify-content: center;
        padding-bottom: 40px;
        border-bottom: 1px solid rgb(220, 218, 218);
        align-items: center;
        img {
          width: 100px;
          height: auto;
        }
        span {
          font-size: 35px;
          color: $c-medium;
          font-weight: 300;
          letter-spacing: 8px;
          line-height: 43px;
        }
      }
    }
    .el-backtop {
      top: 630px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: $c-white;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $c-light;
      margin: 0px;
      padding: 0px;
      z-index: 999;
    }

    .dianzan {
      position: fixed;
      top: 570px;
      right: 40px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: $c-white;
      box-shadow: 0 0 6px rgb(0 0 0 / 12%);
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        color: $c-light;
        background-color: unset;
      }
    }
    .likes {
      .iconfont {
        color: rgb(255, 193, 229);
        background-color: unset;
      }
    }
  }
}
</style>