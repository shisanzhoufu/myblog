<template>
  <div class="index-intrest">
    <div class="container">
      <div class="card">
        <div class="intrest">
          <el-carousel trigger="click" height="600px">
            <el-carousel-item v-for="(item, index) in cardList" :key="index">
              <div class="intrest-title">{{ item.item }}</div>
              <img
                class="intrest-img"
                :src="item.url"
                width="100%"
                height="100%"
              />
              <div class="intrest-breif">{{ item.breif }}</div>
            </el-carousel-item>
          </el-carousel>
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
  private cardList = [
    {
      item: "理想主义青年",
      url: require("../../../assets/index/intrest2.jpg"),
      brief: "永远理想主义，永远浪漫主义",
    },
    {
      item: "行万里路",
      url: require("../../../assets/index/intrest1.jpg"),
      brief:"我希望你读很多书，走很远的路。我希望你爱很多人，也被很多人爱。我希望你走过人山人海，也遍览山河湖海。我希望你看纸质书，送手写的祝福。我要你独立坚强温暖明亮，我要你在这寡淡的世上，深情的活。",
    },
    {
      item: "修行好信仰",
      url: require("../../../assets/index/intrest3.jpg"),
      brief:"我希望你读很多书，走很远的路。我希望你爱很多人，也被很多人爱。我希望你走过人山人海，也遍览山河湖海。我希望你看纸质书，送手写的祝福。我要你独立坚强温暖明亮，我要你在这寡淡的世上，深情的活。",
    },
  ];
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.index-intrest {
  @include common;
  .card {
    // margin-top: 200px;

    .intrest {
      width: 1130px;
      height: 750px;
      position: relative;
      transition: 0.8s;
    //   filter: blur(3px);
    //   &:hover {
    //     filter: blur(5px);
    //     transition: 0.8s;
    //     .intrest-breif {
    //       display: block;
    //     }
    //   }
      .intrest-title {
        @include font-base(
          $lineHeight: 54px,
          $size: 44px,
          $space: 2px,
          $weight: 500
        );
        filter: unset;
        color: $c-white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .intrest-breif {
        @include font-base(
          $lineHeight: 24px,
          $size: 18px,
          $space: 2px,
          $weight: 400
        );
        color: $c-white;
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>