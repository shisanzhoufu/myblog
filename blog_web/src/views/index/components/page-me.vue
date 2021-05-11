<template>
  <div class="index-intrest" id="me">
    <div class="container">
      <div class="card">
        <div class="header">关于我</div>
        <div class="info">
          <p>hi，欢迎来到我的博客！(๑•̀ㅁ•́ฅ)</p>
          <p>这里是jack，正在努力学习的假程序员。(ฅ´ω`ฅ)</p>
          <p>永远年轻，永远奔跑。</p>
          <p>永远浪漫主义，永远理想主义。</p>
          <p>落俗不可避免，但浪漫永存人间。</p>
        </div>
        <div class="social">
          <a href="https://github.com/shisanzhoufu"
            ><img src="../../../assets/social/github.png" alt=""
          /></a>
          <div class="imgList qq">
            <img src="../../..//assets/social/QQ.png" alt="" @click="isShow('qq') "/>
            <div class="list">
              <img
                src="../../../assets/social/qrcode_www.yunyoujun.cn.png"
                alt=""
              />
            </div>
          </div>
          <div class="imgList wx">
            <img src="../../../assets/social/微信.png" alt="" @click="isShow('wx') "/>
            <div class="list">
              <img
                src="../../../assets/social/qrcode_www.yunyoujun.cn.png"
                alt=""
              />
            </div>
          </div>
          <div class="imgList wb">
            <img src="../../../assets/social/微博.png" alt="" @click="isShow('wb') "/>
            <div class="wb list">
              <img
                src="../../../assets/social/qrcode_www.yunyoujun.cn.png"
                alt=""
              />
            </div>
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
@Component
export default class extends Vue {

}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.index-intrest {
  height: 500px;
  background-color: $c-white;
  padding-top: 100px;
  .card {
    border-left: 7px solid $c-light;
    background-color: rgb(239, 249, 255);
    padding: 10px;
    margin-left: 30px;
    // background-color: $c-light;
    .header {
      font-size: 28px;
      font-weight: bold;
    }
    .social {
      position: relative;
      cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
        auto;
      display: flex;
      a{
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
        auto;
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 30px;
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
      }
      .imgList{
        position:relative;
        .list {
        display: none;
        position: absolute;
        top: 30px;
        left: -28px;
        width: 70px;
        height: 70px;
        padding: 4px;
        box-shadow: 0px 2px 5px rgba(84, 84, 84, 0.076);
        border-radius: 3px;
        img {
          width: 100%;
          height: 100%;
        }
        
      }
      &:hover{
          .list{
            display: block;
          }
        }
      }
      
    }
  }
}
</style>