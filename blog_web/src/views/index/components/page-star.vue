<template>
  <div class="index-article" id="star">
    <div class="container">
      <div class="card">
        <div class="imgs">
          <img src="../../../assets/index/03725.png" alt="">
        </div>

        <div class="info">
          <h1>关于23号星球</h1>
          <div class="intro">
           <ul>
             <li>这里应该算是个博客。</li>
             <li>所以大概会记录一些学习、生活上的回忆与业余创作 瞎搞 ，偶尔也会分享自己觉得有趣的东西。 =w=</li>
             <li>本博客所有文章（除特别声明外）默认为原创，均采用 CC BY-NC-SA 许可协议。转载注明出处即可</li>
             <li>十分欢迎无意中点进来的同学，给我留言和建议</li>
             <li>我也希望能在此留下一些值得回忆的、内心里柔软的东西</li>
             </ul>
          </div>
          <div class="brief">
             <p> 世界很大 世界很小 在我们心中</p>
             <p> 都有一个未曾长大的孩子，那就是你的世界，</p>
             <p> 有一天我们会长大，我们也许会遗忘了他，</p>
             <p> 但是他依旧在北极光下，仰望着星空，未曾离开过那里，</p>
             <p> 那里有一颗星星，他给他起名叫23号。
             <p> 也许我们游荡在世界的每一个角落，我们经历背叛</p>
             <p> 我们经历谎言 我们经历爱恨离别 我们经历一段故事,</p>
             <p> 最终我们都会回到北极光下，去找寻那个光屁股看星空的小孩！</p>
          </div>
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

  background-color: $c-white;
  .card {
    .imgs {
      position: relative;
      img {
        position: absolute;
        top:400px;
        left:650px;
        width: 200px;
      }
    }

    .info {
      z-index:4;
      padding-top: 100px;
      h1 {
        text-align: center;
        @include font-base(
          $lineHeight: 44px,
          $size: 36px,
          $space: 2px,
          $weight: bold
        );
        font-family: SourceHanSans-Medium;
        text-align: center;
      }
      .intro{
        margin-left: 20px;
        line-height: 32px;
        margin-bottom: 30px;
      }
      .brief {
        margin-left: 30px;
        border-left: 7px solid $c-light;
        background-color: rgb(239, 249, 255);
        padding-left: 5px;
        @include font-base(
          $lineHeight: 22px,
          $size: 17px,
          $space: 2px,
          $weight: 500
        );
        font-family: SourceHanSans-Medium;
      }
    }
  }
}
</style>