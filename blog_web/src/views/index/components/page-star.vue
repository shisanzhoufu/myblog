<template>
  <div class="index-article" id="star">
    <div class="container">
      <div class="card">
        <div class="imgs">
          <!-- <img src="../../../assets/index/pinkmoon.png" alt=""> -->
        </div>

        <div class="infp">
          <h1>关于23号星球</h1>
          <p>
            世界很大 世界很小 在我们心中
            ，都有一个未曾长大的孩子，那就是你的世界，有一天我们会长大，我们也许会遗忘了他，但是他依旧在北极光下，仰望着星空，未曾离开过那里，那里有一颗星星，他给他起名叫23号。也许我们游荡在世界的每一个角落，我们经历背叛
            我们经历谎言 我们经历爱恨离别 我们经历一段故事
            ，最终我们都会回到北极光下，去找寻那个光屁股看星空的小孩！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.index-article {
  @include common;
  background-image: url("../../../assets/index/418200608.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 600px;
  .card {
    .imgs {
      display: flex;
      justify-content: center;
      // align-items: center;
      img {
        width: 200px;
        height: 200px;
      }
    }

    .infp {
      color: $c-white;
      text-align: center;
      margin-top: 100px;
      h2{
@include font-base(
        $lineHeight: 44px,
        $size: 36px,
        $space: 2px,
        $weight: bold
      );
      font-family: SourceHanSans-Medium;
      text-align: center;
      }
      
      p{
          @include font-base(
        $lineHeight: 40px,
        $size: 20px,
        $space: 2px,
        $weight: 500
      );
      font-family: SourceHanSans-Medium;
      }
    }
  }
}
</style>