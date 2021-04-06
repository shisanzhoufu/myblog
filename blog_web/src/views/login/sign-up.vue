<template>
  <div class="view-register">
    <view-homepage/>
    <div class="link-login">
      <div class="login-card">
        <div class="title">已经注册，快来找我玩叭~</div>
        <el-button class="login-btn" @click.stop='$router.push("/sign-in")'>登录</el-button>
      </div>
      <img src="../../assets/index/login-img.png" alt="" />
    </div>
    <div class="card">
      <div class="title">Register</div>
      <div class="login-box">
        <div class="username">
          <el-input
          placeholder="请输入用户名"
          v-model="username"
          clearable
          class="user-input"
          @change="confirmName"
        >
        </el-input>
        <div :class="nameTip === true ? 'nameTips' : 'noNameTips'">用户名请大于三字</div>
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
        <div :class="tip === true ? 'tips' : 'noTips'">密码请使用英文和数字且大于6位数</div>
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
        <div :class="emailTip === true ? 'emailTips' : 'noEmailTips'">邮箱格式不正确</div>
        </div>
        <el-button class="login-btn" @click="submit"  :loading='loading' :disabled="disabled">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {axiosGet,Message} from "../../api/axiosApi"

@Component({
  components: {},
})
export default class extends Vue {
  private username = "";
  private password = "";
  private password2 = ""
  private email = ""
  private isPwd1 = false
  private isPwd2 = false
  private icon = ''
  private tip = false
  private emailTip = false
  private loading = false
  private nameTip  = false
  private disabled = false

  //提交按钮
  private submit() { 
    if(this.username && this.password && this.password2 && this.email){
      // this.$message({
      //     message: '警告哦，这是一条警告消息',
      //     type: 'warning'
      //   });
      this.disabled = false
      this.confirmName()
      this.confirmEmail()
      this.showPwd2()
      this.showPwd1()
      
      const data = {
       userName: this.username,
       userPassword: this.password,
       email:this.email
       }
       try {
        axiosGet('/api/sign-up',data,function(res: any){
          console.log(res)
        })
       } finally {
         this.loading = false
       }
    }else{
      Message(this,'请检查输入是否错误、遗漏','warning')
    }
  }

  private confirmEmail() {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
     const resPwd = reg.test(this.email)
    //  console.log(resPwd)
     if(!resPwd){
       this.emailTip = true
       this.disabled = true
     }else{
       this.emailTip = false
       this.disabled = false
       console.log(this.disabled,'emal')
     }
  }
  private confirmName(){
    if(this.username.length<4){
      this.nameTip = true
      this.disabled = true
    }else{
      this.disabled = false
      this.nameTip = false
    }
  }
  private showPwd1(){
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,20}$/
  const resPwd = reg.test(this.password)
    if(this.password.length > 6 && this.password){
      this.isPwd1=true
      this.disabled = true
    }else{
      this.disabled = false
      this.isPwd1=false
    }
    if(this.password.length < 7 && !resPwd){
      this.tip = true
      this.disabled = true
    } else{
      this.disabled = false
      this.tip = false
      
    }
  }

  private showPwd2() {
    this.showPwd1()
    if(this.password2 && this.password2 === this.password){
      this.icon="el-icon-success"
      this.disabled = false
    }else{
      this.disabled = true
      this.icon="el-icon-error"
    }
  }

  
}
</script>

<style lang='scss'>
@import "src/base.scss";
@import "../common.scss";
.view-register {
  .link-login {
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
    .login-card {
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
    height: 570px;
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
        height: 40px;
        font-size: 20px;
        border-bottom: 2px solid rgb(167, 157, 226);
        margin-bottom: 30px;
        color: $c-main;
        padding:0px;
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
        top: 110%;
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
    .pwd{
      display: flex;
      position: relative;
      
    }
    .pwd2{
      display: flex;
      
    }
    .el-icon-error{
      display: block;
      margin-top: 15px;
    }
    .el-icon-success{
      margin-top: 15px;
    }
    
    .noTips{
      display: none;
    }
    .tips{
      display: block;
      position: absolute;
      font-size: 12px;
      color: #c9506a;
      top:43px;
    }
    .username{
      display: flex;
      position: relative;
      .nameTips{
        display: block;
      position: absolute;
      font-size: 12px;
      color: #c9506a;
      top:43px;
      }
      .noNameTips{
        display: none;
      }
    }
    .email{
      position: relative;
      .noEmailTips{
        display: none;
      }
      .emailTips{
        display: block;
      position: absolute;
      font-size: 12px;
      color: #c9506a;
      top:43px;
      }
    }
  }
}
</style>