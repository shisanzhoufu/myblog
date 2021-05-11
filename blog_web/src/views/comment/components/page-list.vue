<template>
  <div class="page-list">
    <div class="container">
      <div class="card" v-for="item in commentList" :key="item.comment_id">
        <Comment :comments="item"></Comment>
      </div>
      <div class="more" v-if="commentList.length<total" @click="more">查看更多</div>
      <el-backtop></el-backtop>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Warning } from "../../../api/message";
import { axiosGet } from "../../../api/axiosApi";
import { getCommentList, getMoreComment } from "../../../api/commentApi";
import Comment from "../../../components/basic/comment/index";
@Component({
  components: { Comment },
})
export default class extends Vue {
  [x: string]: any;
  private replay = "";
  private page = 1;
  private total = 0;
  private commentList: any = [];
  //   $store: any;
  mounted() {
    const data = {
      page: this.page,
    };
    this.getComment(data);
  }
  private get commentLists() {
    return this.$store.state.commentList;
  }
  private getComment(data: any) {
    getCommentList(data, (res: any) => {
      this.commentList = res.data.commentList;
      this.total = res.data.total;
      this.$store.commit("setCommentList", {
        commentList: this.commentList,
      });
    });
  }
  private more() {
    const data = {
      page: this.page + 1,
    };
    this.getComment(data);
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
@import "../../common.scss";
.page-list {
  // @include common;
  .card {
    width: 100%;
    padding-top: 30px;
    background-color: $c-white;
    .card_header {
      display: flex;
      .header_info {
        margin: 20px;
        .name {
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
  }
  .el-backtop {
    top: 530px;
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