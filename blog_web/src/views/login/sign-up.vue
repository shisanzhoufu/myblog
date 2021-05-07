<template>
  <div class="view-register">
    <!-- <view-homepage/> -->
    <div class="link-login">
      <div class="login-card">
        <div class="title">已经注册，快来找我玩叭~</div>
        <el-button class="login-btn" @click.stop="$router.push('/sign-in')"
          >登录</el-button
        >
      </div>
      <img src="../../assets/index/接着.svg" alt="" />
    </div>
    <div class="card">
      <div class="title">Register</div>
      <div class="login-box">
        <!-- <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <div class="username">
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            clearable
            class="user-input"
            @change="confirmName"
          >
          </el-input>
          <div :class="nameTip === true ? 'nameTips' : 'noNameTips'">
            用户名请大于两字
          </div>
        </div>
        <div class="pwd">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
            @change="showPwd1"
            class="password-input"
          >
          </el-input>
          <i :class="isPwd1 === true ? 'el-icon-success' : ''"></i>
          <div :class="tip === true ? 'tips' : 'noTips'">
            密码请使用英文和数字且大于6位数
          </div>
        </div>
        <div class="pwd2">
          <el-input
            placeholder="请确认密码"
            v-model="password2"
            show-password
            @change="showPwd2"
            class="password-input"
          >
          </el-input>
          <i :class="icon"></i>
        </div>
        <div class="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="email"
            class="password-input"
            @change="confirmEmail"
          >
          </el-input>
          <div :class="emailTip === true ? 'emailTips' : 'noEmailTips'">
            邮箱格式不正确
          </div>
        </div>
        <el-button
          class="login-btn"
          @click="submit"
          :loading="loading"
          :disabled="disabled"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { axiosGet,formatDateTime } from "../../api/axiosApi";
import { Warning,Success,Error } from "../../api/message";

@Component({
  components: {},
})
export default class extends Vue {
  private username = "";
  private password = "";
  private password2 = "";
  private email = "";
  private isPwd1 = false;
  private isPwd2 = false;
  private icon = "";
  private tip = false;
  private emailTip = false;
  private loading = false;
  private nameTip = false;
  private disabled = false;
  private imageUrl = "";
  //提交按钮
  private submit() {
    if (this.username && this.password && this.password2 && this.email) {
      this.disabled = false;
      this.confirmName();
      this.confirmEmail();
      this.showPwd2();
      this.showPwd1();
      const time = formatDateTime()
      console.log(time)
      const data = {
        userName: this.username,
        userPassword: this.password,
        email: this.email,
        time:time
      };
      try {
        axiosGet("/api/sign-up", data, ((res: any)=>{
          if(res.statusCode===200){
             Success(this,res.msg)
            this.$router.push('/sign-in')
          }else if(res.statusCode === 400){
            Warning(this,res.msg)
            return
          }
        }));
      } finally {
        this.loading = false;
      }
    } else {
      Warning(this, "请检查输入是否错误、遗漏");
    }
  }

  private confirmEmail() {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const resPwd = reg.test(this.email);
    //  console.log(resPwd)
    if (!resPwd) {
      this.emailTip = true;
      this.disabled = true;
    } else {
      this.emailTip = false;
      this.disabled = false;
    }
  }
  private confirmName() {
    if (this.username.length < 3) {
      this.nameTip = true;
      this.disabled = true;
    } else {
      this.disabled = false;
      this.nameTip = false;
    }
  }
  private showPwd1() {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,20}$/;
    const resPwd = reg.test(this.password);
    if (this.password.length > 6 && this.password) {
      this.isPwd1 = true;
      this.disabled = true;
    } else {
      this.disabled = false;
      this.isPwd1 = false;
    }
    if (this.password.length < 7 && !resPwd) {
      this.tip = true;
      this.disabled = true;
    } else {
      this.disabled = false;
      this.tip = false;
    }
  }

  private showPwd2() {
    this.showPwd1();
    if (this.password2 && this.password2 === this.password) {
      this.icon = "el-icon-success";
      this.disabled = false;
    } else {
      this.disabled = true;
      this.icon = "el-icon-error";
    }
  }
  private handleAvatarSuccess(res:any, file:any) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  private beforeAvatarUpload(file:any) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      Error(this,"上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      Error(this,"上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }
}
</script>

<style lang='scss'>
@import "src/base.scss";
@import "../common.scss";
.view-register {
  .link-login {
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
      width: 20%;
      height: 20%;
      position: absolute;
      top: 80%;
      left: 70%;
    }
    .login-card {
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
    height: 440px;
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
      padding-top: 40px;
      padding-bottom:20px;
    }
    .login-box {
      position: relative;
      padding: 20px;

      .el-input__inner {
        position: relative;
        background: none;
        border: none;
        border-radius: 0px;
        height: 40px;
        font-size: 16px;
        border-bottom: 2px solid $c-light;
        margin-bottom: 20px;
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
        top: 105%;
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
    .pwd {
      display: flex;
      position: relative;
    }
    .pwd2 {
      display: flex;
    }
    .el-icon-error {
      display: block;
      margin-top: 15px;
    }
    .el-icon-success {
      margin-top: 15px;
    }

    .noTips {
      display: none;
    }
    .tips {
      display: block;
      position: absolute;
      font-size: 12px;
      color: #c9506a;
      top: 43px;
    }
    .username {
      display: flex;
      position: relative;
      .nameTips {
        display: block;
        position: absolute;
        font-size: 12px;
        color: #c9506a;
        top: 43px;
      }
      .noNameTips {
        display: none;
      }
    }
    .email {
      position: relative;
      .noEmailTips {
        display: none;
      }
      .emailTips {
        display: block;
        position: absolute;
        font-size: 12px;
        color: #c9506a;
        top: 43px;
      }
    }
  }
}
</style>