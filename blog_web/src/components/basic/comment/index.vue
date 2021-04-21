<!--评论模块-->
<template>
  <div class="container">
    <!-- <div class="comment" v-for="item in comments" :key="item.comment_id"> -->
    <div class="comment">
      <div class="info">
        <img
          class="avatar"
          :src="comments.user_avater"
          width="50"
          height="50"
        />
        <!-- 父评论时间名字 -->
        <div class="right">
          <div class="name">{{ comments.user_name }}</div>
          <div class="comment_header">
            <div class="date">{{ comments.comment_time }}</div>

            <div class="control">
              <!-- <span
          class="like"
          :class="{ active: comments.isLike }"
          @click="likeClick(comments)"
        >
          <i class="iconfont icon-dianzan"></i>
          <span class="like-num">{{
            comments.comment_like > 0 ? comments.comment_like + "人赞" : "赞"
          }}</span>
        </span> -->
              <span class="comment-reply" @click="showCommentInput(comments)">
                <i class="iconfont icon-icon-test"></i>
                <span>回复</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 父评论内容 -->
      <div class="content">{{ comments.comment_info }}</div>
      <!-- 子评论区 -->
      <div class="reply">
        <div v-if="replys">
          <div class="item" v-for="reply in replys" :key="reply.reply_id">
            <div class="reply-content">
              <img
                class="reply_avatar"
                :src="reply.fromAvatar"
                width="35"
                height="35"
              />
              <div class="reply_header">
                <span class="from-name">{{ reply.fromName }}</span>
                <div class="reply-bottom">
                  <span>{{ reply.time }}</span>
                  <span
                    class="reply-text"
                    @click="showCommentInput(comments, reply)"
                  >
                    <i class="iconfont icon-icon-test"></i>
                    <span>回复</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="reply_main">
              <span class="to-name">@{{ reply.toName }}</span>
              <span>{{ reply.content }}</span>
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
              :placeholder="placRelyName"
            >
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" @click="commitComment">确定</el-button>
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
import { formatDateTime, axiosGet } from "../../../api/axiosApi";
import { Warning, Success } from "../../../api/message";
import { pubReply } from "../../../api/commentApi";
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
      placRelyName: "",
      replys: [],
      userInfo: {},
      commentInfo: {},
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
      if(this.userInfo){
        const date = formatDateTime();
      let data;
      if (this.inputComment.length > 0) {
        if (this.replys.length === 0) {
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
            time: date, //评论时间
          };
        } else {
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
            time: date, //评论时间
          };
        }

        pubReply(data, (res) => {
          if (res.statusCode === 200) {
            Success(this, res.msg);
            this.getReply();
            this.inputComment = "";
            this.cancel();
          }
        });
        // axiosGet("/api/replyComment", data, (res) => {
        //
        // });
      } else {
        Warning(this, "评论不能为空哦");
        return;
      }
      }else{
        Warning(this, "登录后才能评论哦~");
        return
      }
      
    },
    /**
     * 点击按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      // this.placRelyName = ''
      this.inputComment = "";
      if (reply) {
        this.commentInfo = reply;
        this.placRelyName = "@ " + reply.fromName;
      } else {
        this.commentInfo = item;
        this.inputComment = "";
        this.placRelyName = "@ " + item.user_name;
      }
      this.showItemId = item.comment_id;
    },

    //获取子评论的方法
    getReply() {
      const data = {
        commentId: this.comments.comment_id,
      };
      axiosGet("/api/getReplyList", data, (res) => {
        if (res.commentList.length > 0) {
          this.replys = res.commentList;
        } else {
          this.replys = [];
        }
      });
    },
  },
  created() {
    //获取当前用户信息
    this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.getReply();
  },
};
</script>

<style lang="scss">
@import "src/base.scss";
.container {
  margin: 20px 0px;
  box-sizing: border-box;
  .comment {
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.076);
    .info {
      padding: 20px;
      display: flex;
      align-items: center;
      .avatar {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
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
        display: flex;
        flex-direction: column;
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
        margin-top: 10px;
        .date {
          color: $c-medium;
          margin-right: 10px;
          font-size: 14px;
        }
      }
    }
    .content {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      // padding: 20px 0;

      margin-left: 100px;
    }
    .control {
      // top:10px;
      // right:10px;
      // position: absolute;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $c-medium;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
        &.active,
        &:hover {
          color: $c-light;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
        &:hover {
          color: $c-light;
        }
        .iconfont {
          // margin-top: 3px;
          margin-right: 3px;
        }
        span {
          margin-bottom: 2px;
        }
      }
    }
    .reply {
      margin: 15px 0;
      margin-left: 80px;
      border-left: 1px dashed #ebebee;
      border-bottom: 1px dashed #ebebee;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        // border-bottom: 1px dashed $c-disabled;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          .reply_avatar {
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            border-radius: 50%;
            margin-bottom: 10px;
            box-shadow: 0 0 10px rgb(0 0 0 / 20%);
            border-radius: 50%;
            padding: 3px;
            // &:hover {
            //   box-shadow: 0 0 20px rgb(0 120 231 / 20%);
            // }
          }
          .reply_header {
            margin-left: 10px;
            margin-bottom: 10px;
          }
          .from-name {
            color: $c-link;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            font-size: 14px;
            font-weight: 520;
          }
        }
        .reply_main {
          margin: 10px 0;
          margin-left: 50px;

          .to-name {
            color: $c-link;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            margin-left: 5px;
            margin-right: 5px;
            font-size: 14px;
            font-weight: 520;
          }
          span {
            font-size: 14px;
          }
        }
        .reply-bottom {
          cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
          display: flex;
          align-items: center;
          // margin-top: 6px;
          font-size: 12px;
          color: $c-medium;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            &:hover {
              color: $c-light;
            }
            .iconfont {
              margin-top: 3px;
              margin-right: 3px;
              font-size: 14px;
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
        font-size: 19px;
        color: $c-medium;
        padding: 10px;
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
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
        border: 1px solid #ebebee;
        padding: 10px;
        margin: 5px;
        .gray-bg-input,
        .el-input__inner {
          /*background-color: #67C23A;*/
        }
        .el-textarea__inner {
          border: 0;
          font-size: 19px;
          line-height: 30px;
          resize: none;
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 11px;
            color: $c-medium;
            margin-right: 20px;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            &:hover {
              color: $c-light;
            }
          }
          button {
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            width: 50px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .el-button:focus,
          .el-button:hover {
            color: $c-light;
            border-color: $c-light;
            background-color: #f5ecff;
            font-size: 11px;
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