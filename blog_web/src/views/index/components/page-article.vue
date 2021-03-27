<template>
    <div class="index-article">
        <div class="container">
        <div class="card">
            <div class="art_title">
                个人博客的搭建
            </div>
            <div class="art_info">
                <i class="iconfont icon-biaoqian"></i>
            <div>2021-02-19</div>
            </div>
            <div class="art_img">
                <img src="../../../assets/index/intrest1.jpg" alt="">
            </div>
        </div>

        <div class="card">
            <div class="art_title">
                个人博客的搭建
            </div>
            <div class="art_info">
                <i class="iconfont icon-biaoqian"></i>
            <div>2021-02-19</div>
            </div>
            <div class="art_img">
                <img src="../../../assets/index/intrest1.jpg" alt="">
            </div>
        </div>
        <div class="card">
            <div class="art_title">
                个人博客的搭建
            </div>
            <div class="art_info">
                <i class="iconfont icon-biaoqian"></i>
            <div>2021-02-19</div>
            </div>
            <div class="art_img">
                <img src="../../../assets/index/intrest1.jpg" alt="">
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
.index-article{
     @include common;
    .card{
        width:100%;
        height:430px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 50px;
        &:hover{
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
        }
        .art_title{
            @include font-base(
          $lineHeight: 34px,
          $size: 34px,
          $space: 2px,
          $weight: 500
        );  
        }
        .art_info{
            display: flex;
            margin:10px 0px;
            .iconfont{
                margin-top:4px;
            }
        }
        .art_img{
            width: 100%;
            height: 80%;
            text-align: center;
            
            img{
                width: 100%;
            height: 100%;
            }
        }
    }
}

    
</style>