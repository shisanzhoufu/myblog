<template>
  <div class="index-intrest" id="me">
    <div class="container">
      <div class="card">
        <div class="header">关于我</div>
        <div class="info">
          <p>欢迎来到我的博客！(๑•̀ㅁ•́ฅ)</p>
          <p>这里是Shawn。一个2.5次元的蓝孩纸。(ฅ´ω`ฅ)</p>
          <p>永远年轻，永远奔跑。</p>
          <p>永远浪漫主义，永远理想主义。</p>
          <p>
            在六便士的世界里，掸掉月亮上的尘土。
          </p>
          <p>落俗不可避免，但浪漫永存人间。</p>
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
export default class extends Vue {}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";

.index-intrest {
  @include common;
  height: 500px;
  background-color: $c-white;
  padding-top: 100px;
  .card {
    border-left: 5px solid $c-light;
    padding: 10px;
    // background-color: $c-light;
    .header{

      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>