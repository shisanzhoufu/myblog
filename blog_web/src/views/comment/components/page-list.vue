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
import { Component } from "vue-property-decorator";
import { Warning } from "../../../api/message";
import { axiosGet } from "../../../api/axiosApi";
import Comment from "../../../components/basic/comment/index";
@Component({
  components: { Comment },
})
export default class extends Vue {
  private replay = "";
  private commentList: any = [];
  private replayList = [
    {
      id: "comment0001", //主键id
      time: "2018-07-05 08:30", //评论时间
      ownerId: "talents100020", //文章的id
      fromId: "errhefe232213", //评论者id
      fromName: "犀利的评论家", //评论者昵称
      fromAvatar:
        "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //评论者头像
      likeNum: 3, //点赞人数
      content: "非常靠谱的程序员", //评论内容
      reply: [
        //回复，或子评论
        {
          id: "34523244545", //主键id
          commentId: "comment0001", //父评论id，即父亲的id
          fromId: "observer223432", //评论者id
          fromName: "夕阳红", //评论者昵称
          fromAvatar:
            "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg", //评论者头像
          toId: "errhefe232213", //被评论者id
          toName: "犀利的评论家", //被评论者昵称
          toAvatar:
            "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //被评论者头像
          content: "赞同，很靠谱，水平很高", //评论内容
          time: "2018-07-05 08:35", //评论时间
        },
        {
          id: "34523244545",
          commentId: "comment0001",
          fromId: "observer567422",
          fromName: "清晨一缕阳光",
          fromAvatar:
            "http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg",
          toId: "observer223432",
          toName: "夕阳红",
          toAvatar:
            "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
          content: "大神一个！",
          time: "2018-07-05 08:50",
        },
      ],
    },
  ];
  mounted() {
    axiosGet("/api/commentList", {}, (res: any) => {
      this.commentList = res.commentList;
      console.log(this.commentList);
    });
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
    .card_header {
      display: flex;
      .header_info {
        margin: 20px;
        .name {
          cursor: pointer;
          font-size: 23px;
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