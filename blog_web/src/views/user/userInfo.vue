<template>
  <div class="view-userinfo">
    <view-homepage />
    <div class="container">
      <div class="card1">
        <div class="avater">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-avatar :src="avater" :size="100"></el-avatar>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
          <!-- <el-avatar :src="avater" :size="100"></el-avatar> -->
        </div>

        <div class="title">
          <div class="name">{{ userInfo.user_name }}</div>
          <div class="time">来到28号星球的第{{ date }}天</div>
        </div>
      </div>
      <!-- 展示情况 -->
      <div class="card2" v-if="change">
        <div class="header">
          <div class="title">基本信息</div>
          <div class="change" @click="changeInfo">编辑</div>
        </div>

        <div class="info">
          <div class="item">
            <pre>用户昵称</pre>
            <pre class="info">{{ username }}</pre>
          </div>

          <div class="item">
            <pre>邮&nbsp;&nbsp;箱</pre>
            <pre class="info">{{ email }}</pre>
          </div>

          <div class="item">
            <pre>性&nbsp;&nbsp;别</pre>
            <pre class="info">{{ usergender }}</pre>
          </div>

          <div class="item">
            <pre>个人简介</pre>
            <pre class="info">{{ userbrief }}</pre>
          </div>
        </div>
      </div>
      <!-- 编辑模式 -->
      <div class="card2" v-if="save">
        <div class="header">
          <div class="title">基本信息</div>
          <div class="oparation">
            <div class="change" @click="cancel">取消</div>
            <div class="change" @click="saveInfo">保存</div>
          </div>
        </div>

        <div class="info">
          <div class="item">
            <pre>用户昵称</pre>
            <el-input placeholder="请输入内容" v-model="username" class="input">
            </el-input>
          </div>

          <div class="item">
            <pre>邮&nbsp;&nbsp;箱</pre>
            <el-input placeholder="请输入内容" v-model="email" class="input">
            </el-input>
          </div>

          <div class="item">
            <pre>性&nbsp;&nbsp;别</pre>
            <el-input
              placeholder="请输入内容"
              v-model="usergender"
              class="input"
            >
            </el-input>
          </div>

          <div class="item">
            <pre>个人简介</pre>
            <el-input
              placeholder="请输入内容"
              v-model="userbrief"
              class="input"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Warning, Message, Success } from "../../api/message";
import { axiosPost, logout, timestampToTime } from "../../api/axiosApi";
import { changeUserInfo } from "../../api/commentApi";

@Component({
  components: {},
})
export default class extends Vue {
  private username = "";
  private email = "";
  private usergender = "";
  private userbrief = "";
  private userInfo: any;
  private date: any;
  private change = true;
  private save = false;
  private avater = "";
  private imageUrl = true;
  private gender = {
    0: "女",
    1: "男",
  };
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.username = this.userInfo.user_name;
    this.email = this.userInfo.email;
    this.usergender = this.gender[this.userInfo.user_gender];
    this.userbrief = this.userInfo.user_brief;
    this.avater = this.userInfo.user_avater;
    this.date = timestampToTime(this.userInfo.createAt);
  }
  private changeInfo() {
    this.change = false;
    this.save = true;
  }
  private cancel() {
    this.change = true;
    this.save = false;
  }
  private saveInfo() {
    const data = {
      userid: this.userInfo.user_id,
      username: this.username,
      email: this.email,
      usergender: this.usergender,
      userbrief: this.userbrief,
      useravater: this.avater,
    };
    changeUserInfo(data, (res: any) => {
      if (res.statusCode === 200) {
        Success(this, res.msg);
        localStorage.setItem(
          //储存用户的一些信息到本地
          "userInfo",
          JSON.stringify(res.userInfo)
        );
        this.change = true;
        this.save = false;
      }
    });
  }
}
</script>

<style lang='scss'>
@import "src/base.scss";
@import "../common.scss";
.view-userinfo {
  @include common;
  padding-top: 100px;
  .card1 {
    background-color: $c-white;
    width: 100%;
    height: 200px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    // border-radius: 10px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;

    .avater {
      width: 100px;
      height: 100px;
      box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      border-radius: 50%;
      margin: 20px;
      padding: 5px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .avatar-uploader {
        width: 100px;
        height: 100px;
        display: flex;
        // justify-content: center;
        // align-items: center;
      }
      &:hover {
        box-shadow: 0 0 30px rgb(0 120 231 / 20%);
      }
    }
    .title {
      .name {
        font-size: 30px;
        color: $c-main;
        padding-bottom: 10px;
      }
      .time {
        color: $c-medium;
      }
    }
  }
  .card2 {
    background-color: $c-white;
    width: 100%;
    height: 490px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    .header {
      border-bottom: 1px solid $c-disabled;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px;
      .title {
        font-size: 30px;
        line-height: 30px;

        color: $c-main;
      }

      .oparation {
        display: flex;
        
      }
      .change {
        padding-left: 20px;
        color: $c-medium;
        cursor: pointer;
      }
    }

    .info {
      .item {
        display: flex;
        align-items: center;
        padding: 10px;
        pre {
          width: 100px;
          font-size: 25px;
          line-height: 30px;
        }
        .info {
          margin-left: 30px;
          color: $c-medium;
        }
        // justify-content: space-between;
        // border-bottom: 1px solid $c-disabled;
      }
    }
    .input {
      margin-left: 30px;
    }
    .el-input__inner {
      position: relative;
      background: none;
      border: none;
      border-radius: 0px;
      height: 40px;
      font-size: 20px;
      border-bottom: 2px solid $c-medium;
      // margin-bottom: 30px;
      color: $c-medium;
      padding: 0px;
      // &:hover {
      //   border-bottom: 2px solid $c-main;
      // }
    }
    // border-radius: 10px;
  }
}
</style>