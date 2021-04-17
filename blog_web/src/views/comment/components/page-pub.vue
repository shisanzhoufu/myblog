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
import { Component,Watch } from "vue-property-decorator";
import { Warning,Success } from "../../../api/message";
import {formatDateTime, axiosGet } from "../../../api/axiosApi";
import { pubComment,getCommentList } from "../../../api/commentApi";

    import { mapState, mapMutations } from 'vuex';
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
      const time = formatDateTime()
      const data = {
        userId: this.userInfo.user_id,
        userName: this.userInfo.user_name,
        userAvater: this.userInfo.user_avater,
        comment: this.comment,
        time:time
      };
      pubComment(data,((res:any)=>{
          Success(this,res.msg)
            this.comment = ''
            const NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
            this.$router.push(NewPage);
            this.$router.go(-1);
      }))
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
    margin-top: 60px;
    .iconfont {
      font-size: 25px;
    }
    .comment {
      width: 100%;
      
      height: 160px;
      background-color: $c-white;
      // border-radius: 10px;
      box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.076);
      position: relative;
      padding: 10px;
      &:hover{
        box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.275);
      }
      .el-textarea__inner {
        border: 0;
        font-size: 20px;
        line-height: 30px;
        resize: none;
        height:40px;
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