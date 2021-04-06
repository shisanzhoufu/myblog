<template>
  <div class="view-login">
    <view-homepage/>
    <div class="link-register">
      <div class="register-card">
        <div class="title">还没有注册？快来和我成为朋友叭~</div>
        <el-button class="register-btn" @click.stop='$router.push("/sign-up")'>注册</el-button>
      </div>
      <img src="../../assets/index/login-img.png" alt="" />
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
        <el-button class="login-btn" @click="submit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {axiosPost,Message} from "../../api/axiosApi"
@Component({
  components: {},
})
export default class extends Vue {
  private username = "";
  private password = "";
  private submit(){
    if(this.username && this.password){
      const data = {
        userName:this.username,
        password: this.password
      }
      axiosPost('/api/sign-in',data,function(res: any){
          console.log(res)
        })
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
    width: 2000px;
    height: 1800px;
    border-radius: 50%;
    background-image: linear-gradient(135deg, #667eea 30%, #764ba2 100%);
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    &:hover{
        background-image: linear-gradient(135deg, #764ba2 30%, #667eea 100%);
        transition: 0.8s;
    }
    img {
      width: 20%;
      height: 20%;
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
        font-size: 30px;
        font-weight: 400;
      }
      .el-button {
        background: none;
        position: absolute;
        left: 50%;
        top: 250%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 50px;
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
    width: 400px;
    height: 500px;
    border: 2px;
    border-radius: 20px;
    color: $c-main;
    box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.2);
    background: $c-white;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 42px;
      padding-top: 80px;
    }
    .login-box {
      position: relative;
      padding: 20px;

      .el-input__inner {
        position: relative;
        background: none;
        border: none;
        border-radius: 0px;
        height: 50px;
        font-size: 20px;
        border-bottom: 2px solid rgb(167, 157, 226);
        margin-bottom: 30px;
        color: $c-main;
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
        background: $c-main;
        position: absolute;
        left: 50%;
        top: 130%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
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
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>