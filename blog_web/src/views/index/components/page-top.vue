<template>
  <div class="index-top">
    <div class="container">
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          :size="150"
        ></el-avatar>
      </div>
      <div class="title">
        <div class="name">十三州府</div>
        <div class="brief">理想主义青年永不被现实招安</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  created() {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo));
  }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.index-top {
  @include common;
  margin-bottom: 100px;
  .avatar {
    text-align: center;
    margin-top: 120px;
  }
  .title {
    margin-top: 50px;
    .name {
      @include font-base(
        $lineHeight: 54px,
        $size: 36px,
        $space: 2px,
        $weight: bold
      );
      font-family: SourceHanSans-Bold, SourceHanSans;
      color: #000000;
      text-align: center;
    }
    .brief {
      @include font-base(
        $lineHeight: 36px,
        $size: 20px,
        $space: 1px,
        $weight: 400
      );
      font-family: SourceHanSans-Bold, SourceHanSans;
      color: #000000;
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