<template>
  <div class="art-top">
    <div class="container">
      <div class="title">
        <img :src="topInfo.url" alt="" /> <span>{{ topInfo.label }}</span>
      </div>
      <div class="brief">{{ topInfo.brief }}</div>
      <!-- <div class="num">共10篇文章</div> -->
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Warning, Success, Error } from "../../../api/message";
import { axiosPost, axiosGet, formatDateTime } from "../../../api/axiosApi";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop(Object) topInfo!: object;

  created() {
    // console.log(this.types)
    // const types = this.$route.params.types
    // this.topList.forEach(item=>{
    //     if(item.type==this.types){
    //         this.topInfo = item
    //     }
    //     console.log(this.topInfo,'this.info')
    // })
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
@import "../../common.scss";
.art-top {
  @include common;
  margin-top: 60px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    span {
      font-size: 38px;
      color: $c-medium;
      font-weight: 300;
      letter-spacing: 8px;
    }
  }
  .brief {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    font-size: 16px;
    color: $c-medium;
    font-weight: 400;
    letter-spacing: 3px;
  }
}
</style>