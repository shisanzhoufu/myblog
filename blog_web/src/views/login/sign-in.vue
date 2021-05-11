<template>
  <div class="view-login">
    <!-- <view-homepage/> -->
    <div class="link-register">
      <div class="register-card">
        <div class="title">还没有注册？快来和我成为朋友叭~</div>
        <el-button class="register-btn" @click.stop="$router.push('/sign-up')"
          >注册</el-button
        >
      </div>
      <img src="../../assets/index/坐着1.svg" alt="" />
    </div>
    <div class="card">
      <div class="title">Login</div>
      <div class="login-box">
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          clearable
          class="user-input"
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
          class="password-input"
        >
        </el-input>
        <el-button class="login-btn" @click="submit" :loading="loading"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Warning, Message,Error,Success } from "../../api/message";
import { axiosPost,logout } from "../../api/axiosApi";
import {loginInfo} from "../../api/commentApi"
@Component({
  components: {},
})
export default class extends Vue {
  private username = "";
  private password = "";
  private loading = false;
  private submit() {
    this.loading = true;
    if (this.username && this.password) {
      const data = {
        userName: this.username,
        password: this.password,
      };
      try {
        loginInfo(data,((res:any)=>{
          if (res.statusCode === 200) {
            //把登录信息存入localstorage
            localStorage.setItem(
              //储存用户的一些信息到本地
              "userInfo",
              JSON.stringify(res.userInfo)
            );
            Success(this,'登录成功~')
            console.log('009874345678')
            this.$router.push("/");

          } else {
            Error(this, res.msg);
          }
        }))
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    } else {
      Warning(this, "请检查输入是否错误、遗漏");
    }
  }
}
</script>

<style lang='scss'>
@import "src/base.scss";
@import "../common.scss";
.view-login {
  .link-register {
    position: absolute;
    width: 1700px;
    height: 1300px;
    border-radius: 50%;
    background-image: linear-gradient(135deg, #667eea 30%, #9ec1e2 100%);
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    &:hover {
      background-image: linear-gradient(135deg, #9ec1e2 30%, #667eea 100%);
      transition: 0.8s;
    }
    img {
      width: 18%;
      height: 18%;
      position: absolute;
      top: 80%;
      left: 70%;
    }
    .register-card {
      position: absolute;
      top: 65%;
      left: 62%;
      .title {
        color: $c-white;
        font-size: 25px;
        font-weight: 400;
      }
      .el-button {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
        background: none;
        position: absolute;
        left: 50%;
        top: 250%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        transition: 0.8s;
        color: $c-white;
      }
    }
  }
  .card {
    position: absolute;
    left: 70%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 400px;
    border: 2px;
    border-radius: 20px;
    color: $c-main;
    box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.2);
    background: $c-white;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35px;
      padding-top: 50px;
      padding-bottom: 30px;
    }
    .login-box {
      position: relative;
      padding: 20px;
      .requireModuleExtension {
        border-color: #409eff00;
        outline: 0;
      }
      .el-input__inner {
        position: relative;
        background: none;
        border: none;
        border-radius: 0px;
        height: 40px;
        font-size: 16px;
        border-bottom: 2px solid $c-light;
        margin-bottom: 30px;
        color: $c-main;
        padding: 0px;
        &:hover {
          border-bottom: 2px solid $c-main;
        }
      }
      .el-input__clear {
        position: absolute;
        bottom: 12px;
        right: 10px;
      }
      .sign-up {
        text-decoration: none;
        color: $c-main;
      }
      .el-button {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
        background: $c-main;
        position: absolute;
        left: 50%;
        top: 110%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        transition: 0.8s;
        color: $c-white;
      }
      .el-button:focus,
      .el-button:hover {
        width: 200px;
        transition: 0.8s;
        border-radius: 25px;
        font-size: 14px;
      }
    }
  }
}
</style>