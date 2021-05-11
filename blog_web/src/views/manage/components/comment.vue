<template>
  <div class="manege-comment">
    <div class="container">
      <div
        class="card"
        v-for="comment in commentList"
        :key="comment.comment_id"
      >
        <div class="info">
          <img
            class="avatar"
            :src="comment.user_avater"
            width="50"
            height="50"
          />
          <div class="right">
            <div class="comment_header">
              <div class="name">{{ comment.user_name }}</div>
              <div class="date">{{ comment.comment_time }}</div>
            </div>
            <div class="content">{{ comment.comment_info }}</div>
          </div>
        </div>
        <div class="delete" @click="delBtn(comment)">删除</div>
       
      </div>
       <div class="more" v-if="commentList.length<total&&commentList.length>10" @click="more">查看更多</div>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { getMoreComment, delComment } from "../../../api/commentApi";
import { Success, Error } from "../../../api/message";
@Component
export default class extends Vue {
  private commentList = [];
  private total = 0;
  private page = 1;
  created() {
    const data = {
      page:this.page
    }
    this.getMore(data)
  }
  private getMore(data:any){
    getMoreComment(data,(res: any) => {
      if (res.statusCode === 200) {
        this.commentList = res.data.commentList;
        this.total = res.data.total
      }
    });
  }
  private more() {
    const data = {
      page: this.page + 1,
    };
    this.getMore(data)
  }
  private delBtn(comment: any) {
    const data = {
      commentid: comment.comment_id,
    };
    delComment(data, (res: any) => {
      if (res.statusCode === 200) {
        this.commentList = res.commentList;
        Success(this, "删除成功~");
      } else {
        Error(this, "失败，稍后再试~");
      }
    });
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";

.manege-comment {
  position: relative;
  .more {
    height: 50px;
    width: 100%;
    font-size: 16px;
    color: $c-link;
    box-shadow: 0 1px 3px rgb(26 26 26 / 10%);
    background-color: $c-white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .card {
    position: relative;
    margin-bottom: 20px;
    background-color: $c-white;
    display: flex;
    flex-direction: column;
    // box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.076);
    border-bottom: 1px solid $c-disabled;
    .info {
      padding: 20px;
      display: flex;
      // align-items: center;
      .avatar {
        border-radius: 50%;
        margin-bottom: 10px;
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
        border-radius: 50%;
        padding: 3px;
        &:hover {
          box-shadow: 0 0 30px rgb(0 120 231 / 20%);
        }
      }
      .right {
        // display: flex;
        // flex-direction: column;
        margin-top: 5px;
        margin-left: 30px;
        .name {
          cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
          font-size: 16px;
          line-height: 20px;
          font-weight: bold;

          // margin-bottom: 10px;
          color: $c-link;
          // &:hover {
          //   color: $c-brand;
          // }
        }
      }
      .comment_header {
        display: flex;
        // margin-top: 10px;
        .date {
          color: $c-medium;
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }
    .content {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      // color:$c-medium;
      margin-top: 20px;
      // padding: 20px 0;

      // margin-left: 100px;
    }
    .delete {
      color: $c-error;
      position: absolute;
      bottom: 18px;
      right: 10px;
      font-size: 14px;
    }
  }
}
</style>