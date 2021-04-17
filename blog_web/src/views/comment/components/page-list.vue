<template>
  <div class="page-list">
    <div class="container">
      <div class="card" v-for="item in commentList" :key="item.comment_id">
        <!-- <div class="card_header">
          <el-avatar
            class="avater"
            :size="70"
            :src="item.user_avater"
          ></el-avatar>
          <div class="header_info">
            <div class="name">{{ item.user_name }}</div>
            <div class="time">{{ item.comment_time }}</div>
          </div>
        </div>
        <div class="card_content">
          <el-link :underline="false" @click="replay(item.comment_id)"
            >回复</el-link
          >
          <div class="card_info">
            {{ item.comment_info }}
          </div> -->
          <Comment :comments="item"></Comment>
<!--           
        </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component,Watch } from "vue-property-decorator";
import { Warning } from "../../../api/message";
import { axiosGet } from "../../../api/axiosApi";
import { getCommentList } from "../../../api/commentApi";
import Comment from "../../../components/basic/comment/index";
@Component({
  components: { Comment },
})
export default class extends Vue {
  [x: string]: any;
  private replay = "";
  private commentList: any = [];
//   $store: any;
  mounted() {
    getCommentList(((res:any)=>{
        this.commentList = res.commentList
        this.commentList = this.commentList.reverse()
        this.$store.commit('setCommentList',{
            commentList:this.commentList
        })
    }))
  }
  private get commentLists() {
          return this.$store.state.commentList
      }
      
}
</script>
<style lang="scss">
@import "src/base.scss";
@import "../../common.scss";
.page-list {
  @include common;
  .card {
    width: 100%;
    margin-top: 30px;
    background-color: $c-white;
    .card_header {
      display: flex;
      .header_info {
        margin: 20px;
        .name {
          cursor: pointer;
          font-size: 16px;
          line-height: 20px;
          font-weight: 500;
          color: $c-info;
          &:hover {
            color: $c-brand;
          }
        }
        .time {
          color: $c-medium;
          margin-top: 10px;
        }
      }
    }
    .card_content {
      width: 100%;
      min-height: 100px;
      position: relative;
      .el-link.el-link--default {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: #ffffff00;
        border: none;
        font-size: 20px;
        color: $c-warning;
        &:hover {
          color: $c-light;
        }
      }

      .card_info {
        width: 80%;
        margin-left: 90px;
        font-size: 20px;
        line-height: 25px;
        font-weight: 500;
      }
    }
  }
  .replay_card {
    margin-top: 20px;
    margin-left: 90px;
    .iconfont {
      font-size: 25px;
    }
    .replay {
      width: 100%;
      border: 1px solid $c-light;
      height: 150px;
      border-radius: 10px;
      position: relative;
      padding: 10px;
      .el-textarea__inner {
        border: 0;
        font-size: 20px;
        line-height: 25px;
        resize: none;
        height: 150px;
      }
      .el-button {
        height: unset;
      }
      .el-button:focus,
      .el-button:hover {
        color: $c-light;
        border-color: $c-light;
        background-color: #f5ecff00;
      }
      .replay_publish {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}
</style>