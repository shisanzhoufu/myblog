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
            :on-change="onchange"
            :auto-upload="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <template>
              <el-avatar :src="avater" :size="80"></el-avatar>
              <!-- <img :src="scope.row.headUrl" alt="" width="60px" height="60px"> -->
            </template>

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
import { Warning, Message, Success,Error } from "../../api/message";
import {
  axiosPost,
  logout,
  timestampToTime,
  uploadPlans,
} from "../../api/axiosApi";
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
  /**头像上传 */
  // 上传变化监听   ------ 这里是重点 图片转base
  private onchange(file: any, fileList: any) {
    const form = new FormData();
    form.append("file", file.raw);
    axiosPost(
      "/api/upload",
      form,
      (res: any) => {
        this.avater = res;
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
            Success(this, '上传成功~');
            localStorage.setItem(
              //储存用户的一些信息到本地
              "userInfo",
              JSON.stringify(res.userInfo)
            );
          }else{
            Error(this,'上传失败，稍后再试')
          }
        });
      },
      { headers: { "content-type": "multipart/form-data" } }
    );
  }
  private handleAvatarSuccess(res: any, file: any) {
    // this.avater = URL.createObjectURL(file.raw);
  }
  private beforeAvatarUpload(file: any) {
    const isJPG = file.raw.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      Warning(this, "上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      Warning(this, "上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
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
    height: 150px;
    box-shadow: 0px 2px 5px rgba(104, 104, 104, 0.076);
    // border-radius: 10px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;

    .avater {
      width: 80px;
      height: 80px;
      box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      border-radius: 50%;
      margin: 20px;
      padding: 4px;
      .avatar-uploader {
        width: 100px;
        height: 100px;
        display: flex;
      }
      &:hover {
        box-shadow: 0 0 30px rgb(0 120 231 / 20%);
      }
    }
    .title {
      .name {
        font-size: 25px;
        color: $c-main;
        padding-bottom: 10px;
      }
      .time {
        color: $c-medium;
        font-size: 14px;
      }
    }
  }
  .card2 {
    background-color: $c-white;
    width: 100%;
    height: 430px;
    box-shadow: 0px 2px 5px rgba(104, 104, 104, 0.076);
    .header {
      border-bottom: 1px solid $c-disabled;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px;
      .title {
        font-size: 25px;
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
        padding: 0 10px;
        pre {
          width: 100px;
          font-size: 20px;
          line-height: 30px;
        }
        .info {
          margin-left: 30px;
          color: $c-medium;
        }
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
      border-bottom: 1px solid $c-medium;
      color: $c-medium;
      padding: 0px;
      // &:hover {
      //   border-bottom: 2px solid $c-main;
      // }
    }
  }
}
</style>