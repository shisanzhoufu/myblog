<template>
  <div class="index-top">
    <div class="container">
      <!-- <div class="avatar">
        <a href="#me">
          <img src="https://www.yunyoujun.cn/images/avatar.jpg" name="关于我"
        /></a>
      </div> -->
      <div class="title">
        <a href="#star">
          <div class="name">
            <img
              src="../../../assets/index/23.png"
              alt="23号星球"
              name="关于23号星球"
            />
          </div>
        </a>

        <div class="brief"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.index-top {
  // margin-bottom: 100px;
  background-color: rgb(92, 108, 123);
  background-image: url("../../../assets/index/bac.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0;
  margin: 0;
  height: 600px;
  .avatar {
    text-align: center;
    padding-top: 100px;
    img {
      cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
        auto;
      width: 100px;
      height: 100px;
      box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      border-radius: 50%;
      margin: 20px;
      padding: 4px;
      &:hover {
        box-shadow: 0 0 30px rgb(0 120 231 / 20%);
      }
    }
  }
  .title {
    padding-top: 150px;
    .name {
      img {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
          auto;
        width: auto;
        height: 100px;
        text-align: center;
      }
      font-family: SourceHanSans-Medium;
      color: rgba(255, 255, 255, 0.864);
      text-align: center;
    }
    .brief {
      text-align: center;
      // img {
      //   width: auto;
      //   height: 50px;
      // }
      @include font-base(
        $lineHeight: 36px,
        $size: 20px,
        $space: 1px,
        $weight: 400
      );
      font-family: SourceHanSans-Bold, SourceHanSans;
      color: rgba(255, 255, 255, 0.789);
      text-align: center;
      margin-top: 30px;
    }
  }
  .own-card {
    .intrest {
      display: flex;
      justify-content: center;
      .intrest-img {
        width: 30%;
        height: 30%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>