<template>
  <div class="page-pub">
    <div class="container">
      <div class="main_card">
        <!-- <i class="iconfont icon-pinglun">    留言</i> -->
        <div class="comment">
          <el-input
            type="textarea"
            autosize
            maxlength="300"
            v-model="comment"
            placeholder="给我留言叭~"
          ></el-input>
          <el-button class="comment_publish" @click="publish" :plain="true"
            >发布</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Warning, Success } from "../../../api/message";
import { formatDateTime, axiosGet } from "../../../api/axiosApi";
import { pubComment, getCommentList } from "../../../api/commentApi";

import { mapState, mapMutations } from "vuex";
@Component({
  components: {},
})
export default class extends Vue {
  private comment = "";
  private userInfo: any;
  mounted() {
    this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  }
  private publish() {
    if (this.comment !== "") {
      if (this.userInfo) {
        const time = formatDateTime();
        const data = {
          userId: this.userInfo.user_id,
          userName: this.userInfo.user_name,
          userAvater: this.userInfo.user_avater,
          comment: this.comment,
          time: time,
        };
        pubComment(data, (res: any) => {
          Success(this, res.msg);
          this.comment = "";
          const NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
          this.$router.push(NewPage);
          this.$router.go(-1);
        });
      } else {
        Warning(this, "请先登陆哦");
      }
    } else {
      Warning(this, "请输入内容~");
    }
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
@import "../../common.scss";
.page-pub {
  .main_card {
    margin-top: 40px;
    margin-bottom: 30px;
     background-color: $c-white;
      border: 1px solid #ebebee;
margin-left: 10px;
margin-right: 10px;
      border-radius: 10px;
    .iconfont {
      font-size: 25px;
    }
    .comment {
      margin: 10px;
      width: 97%;
      height: 160px;
     

      box-shadow: 0 ;
      position: relative;

      // &:hover {
      //   box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.275);
      // }
      .el-textarea__inner {
        border: 0;
        font-size: 20px;
        line-height: 30px;
        resize: none;
        height: 40px;
      }
      .el-button:focus,
      .el-button:hover {
        font-size: 11px;
        color: $c-light;
        border-color: $c-light;
        background-color: #f5ecff;
      }
      .comment_publish {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 50px;
        height: 30px;
        display: flex;
        font-size: 11px;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>