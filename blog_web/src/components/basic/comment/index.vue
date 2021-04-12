<!--评论模块-->
<template>
  <div class="container">
    <!-- <div class="comment" v-for="item in comments" :key="item.comment_id"> -->
    <div class="comment">
      <div class="info">
        <img
          class="avatar"
          :src="comments.user_avater"
          width="60"
          height="60"
        />
        <div class="right">
          <div class="name">{{ comments.user_name }}</div>
          <div class="date">{{ comments.comment_time }}</div>
        </div>
      </div>
      <div class="content">{{ comments.comment_info }}</div>
      <div class="control">
        <span
          class="like"
          :class="{ active: comments.isLike }"
          @click="likeClick(comments)"
        >
          <i class="iconfont icon-dianzan"></i>
          <span class="like-num">{{
            comments.likeNum > 0 ? comments.likeNum + "人赞" : "赞"
          }}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(comments)">
          <i class="iconfont icon-icon-test"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div v-if="replys">
          <div class="item" v-for="reply in replys" :key="reply.id">
          <div class="reply-content">
            <span class="from-name">{{ reply.fromName }}</span
            ><span>: </span>
            <span class="to-name">@{{ reply.toName }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.time }}</span>
            <span class="reply-text" @click="showCommentInput(comments,reply)">
              <i class="iconfont icon-icon-test"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        </div>
        
        <!-- <div
          class="write-reply"
          v-if="replys.length > 0"
          @click="showCommentInput(comments)"
        >
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div> -->
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === comments.comment_id">
            <el-input
              class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
            >
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" @click="commitComment"
                >确定</el-button
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import {formatDateTime,axiosGet} from '../../../api/axiosApi'
export default {
  props: {
    comments: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      inputComment: "",
      showItemId: "",
      replys: [],
      userInfo:{},
      commentInfo:{}
    };
  },
  computed: {},
  methods: {
    /**
     * 点赞
     */
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, "isLike", true);
        item.likeNum++;
      } else {
        if (item.isLike) {
          item.likeNum--;
        } else {
          item.likeNum++;
        }
        item.isLike = !item.isLike;
      }
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = "";
    },

    /**
     * 提交评论
     */
    commitComment() {
      const date = formatDateTime()
      let data
      if(this.commentInfo.comment_review){
        //回复父评论
        data = {
          commentId: this.comments.comment_id, //主键id
          fromId: this.userInfo.user_id, //评论者id
          fromName: this.userInfo.user_name, //评论者昵称
          fromAvatar: this.userInfo.user_avater, //评论者头像
          toId: this.comments.user_id, //被评论者id
          toName: this.comments.user_name, //被评论者昵称
          toAvatar: this.comments.user_avater, //被评论者头像
          content: this.inputComment, //评论内容
          time:date, //评论时间
        }
      }else {
      //回复子评论
        data = {
          commentId: this.comments.comment_id, //主键id
          fromId: this.userInfo.user_id, //评论者id
          fromName: this.userInfo.user_name, //评论者昵称
          fromAvatar: this.userInfo.user_avater, //评论者头像
          toId: this.commentInfo.fromId, //被评论者id
          toName: this.commentInfo.fromName, //被评论者昵称
          toAvatar: this.commentInfo.fromAvatar, //被评论者头像
          content: this.inputComment, //评论内容
          time:date, //评论时间
        }
      }
      console.log(data)
      
        // console.log('全局版',data)
      
        axiosGet('/api/replyComment',data, (res)=>{
          console.log(res)
        })
    },
    /**
     * 点击按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item,reply) {
      if (reply) {
        this.commentInfo  = reply
        
      } else {
        this.commentInfo = item
        this.inputComment = "";
      }
      this.showItemId = item.comment_id;
    },
  },
  created() {
    this.replys = eval(this.comments.comment_review);
    //登录用户的信息
    this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  },
};
</script>

<style lang="scss">
@import "src/base.scss";
.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $c-disabled;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          cursor: pointer;
          font-size: 23px;
          line-height: 20px;
          font-weight: 500;
          // color: $c-info;
          // &:hover {
          //   color: $c-brand;
          // }
        }
        .date {
          color: $c-medium;
          margin-top: 10px;
        }
      }
    }
    .content {
      font-size: 20px;
      line-height: 25px;
      font-weight: 500;
      padding: 10px 0;
      line-height: 24px;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: $c-medium;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $c-light;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $c-light;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid $c-disabled;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $c-disabled;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 20px;

          .from-name {
            color: $c-main;
            cursor: pointer;
          }
          .to-name {
            color: $c-main;
            cursor: pointer;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 16px;
          color: $c-medium;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $c-light;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: $c-medium;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: $c-light;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          /*background-color: #67C23A;*/
        }
        .el-textarea__inner {
          border: 0;
          font-size: 20px;
          line-height: 30px;
          resize: none;
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 14px;
            color: $c-medium;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: $c-light;
            }
          }
          .el-button:focus,
          .el-button:hover {
            color: $c-light;
            border-color: $c-light;
            background-color: #f5ecff;
          }
          .confirm {
            // font-size: 20px;
          }
        }
      }
    }
  }
  .iconfont {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>