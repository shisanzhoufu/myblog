<template>
  <div class="manege-user" id="me">
    <div class="container">
      <div class="card1" v-for="user in userList" :key="user.user_id" @click="manageInfo(user)">
        <div class="avater">
          <el-avatar :src="user.user_avater" :size="60"></el-avatar>
        </div>
        <div class="title">
          <div class="name">{{ user.user_name }}</div>
          <div class="brief">简介：{{user.user_brief}}</div>
          <div class="info">
            <span>{{user.email}}</span>
            
            <span>{{gender[user.user_gender]}}</span>
            <span>{{user.createAt}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import {getUserList } from "../../../api/commentApi"
@Component
export default class extends Vue {
  private userList = []
  private gender = {
    0: "女",
    1: "男",
  };
  created(){
    getUserList((res:any)=>{
      if(res.statusCode===200){
        this.userList = res.commentList
        this.userList = this.userList.reverse()
      }
    })
  }
  private manageInfo(user:any){
    console.log(user)
    this.$router.push({ name: "manageInfo", params: { userInfo: user } });
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";

.manege-user {
  .card1 {
    width: 100%;
    height: 130px;
    box-shadow: 0px 5px 30px rgba(179, 179, 179, 0.1);
    background-color: $c-white;
    
    display: flex;
    margin-bottom: 20px;

    .avater {
      margin: 15px;
      width: 60px;
      height: 60px;
      box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      border-radius: 50%;
      // margin: 20px;
      padding: 2px;
      &:hover {
        box-shadow: 0 0 30px rgb(0 120 231 / 20%);
      }
    }
    .title {
      .name {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
        margin-left: 30px;
        margin-top: 15px;
        font-size: 23px;
        color: $c-main;
        // padding-bottom: 10px;
      }
      .brief{
        margin-left: 30px;
        color: $c-medium;
        font-size: 14px;
        margin-top: 10px;
      }
      .info {
        color: $c-medium;
        font-size: 14px;
        margin-top: 30px;
        
        span{
          margin-left: 28px;
        }
      }
    }
  }
}
</style>