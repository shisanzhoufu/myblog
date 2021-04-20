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
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { getCommentList, delComment } from "../../../api/commentApi";
import { Success, Error } from "../../../api/message";
@Component
export default class extends Vue {
  private commentList = [];
  created() {
    getCommentList((res: any) => {
      if (res.statusCode === 200) {
        this.commentList = res.commentList;
        this.commentList = this.commentList.reverse();
      }
    });
  }
  private delBtn(comment: any) {
    console.log(comment);
    const data = {
      commentid: comment.comment_id,
    };
    delComment(data, (res: any) => {
      if (res.statusCode === 200) {
        // this.commentList.forEach((item:any,index:any)=>{
        //   if(item.comment_id===comment.comment_id){
        //     item.splice(index, 1);
        //   }

        // })
        // console.log(this.commentList,'00998776')
        console.log(res)
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
  .card {
    cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
      auto;
    position: relative;
    margin-bottom: 20px;
    background-color: $c-white;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.076);
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
          cursor: pointer;
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