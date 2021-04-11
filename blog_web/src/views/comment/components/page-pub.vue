<template>
  <div class="page-pub">
    <div class="container">
      <div class="main_card">
        <!-- <i class="iconfont icon-pinglun">    留言</i> -->
        <div class="comment">
          <el-input type="textarea" autosize maxlength="300" v-model="comment" placeholder="给我留言叭~"></el-input>
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
import { Component } from "vue-property-decorator";
import { Warning,Success } from "../../../api/message";
import { axiosGet } from "../../../api/axiosApi";
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
    if (this.userInfo) {
      console.log(this.userInfo);
      const data = {
        userId: this.userInfo.user_id,
        userName: this.userInfo.user_name,
        userAvater: this.userInfo.user_avater,
        comment: this.comment,
      };
      axiosGet("/api/comment", data, (res: any) => {
        console.log(res);
        if(res.statusCode===200){
            Success(this,res.msg)
            this.comment = ''
        }
      });
    } else {
      Warning(this, "请先登陆哦");
    }
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
@import "../../common.scss";
.page-pub {
  @include common;
  .main_card {
    margin-top: 150px;
    .iconfont {
      font-size: 25px;
    }
    .comment {
      width: 100%;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
      height: 200px;
      border-radius: 10px;
      position: relative;
      padding: 10px;
      .el-textarea__inner {
        border: 0;
        font-size: 25px;
        line-height: 30px;
        resize: none;
        height: 150px;
      }
      .el-button:focus,
      .el-button:hover {
        color: $c-light;
        border-color: $c-light;
        background-color: #f5ecff;
      }
      .comment_publish {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}
</style>