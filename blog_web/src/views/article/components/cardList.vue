<template>
    <div class="view-article">
        <div class="container">
            <div class="card" v-for="blog in blogList" :key="blog.blog_id">
            <div class="art_title">
                {{blog.blog_title}}
            </div>
            <div class="art_info">
                <!-- <i class="iconfont icon-biaoqian"></i> -->
            <div>{{blog.blog_create_date}}</div>
            </div>
            <div class="art_img">
                <img src="../../../assets/index/intrest1.jpg" alt="">
            </div>
        </div>
            </div>    
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component,Prop } from "vue-property-decorator";
import { Warning,Success,Error } from "../../../api/message";
import { axiosPost,axiosGet,formatDateTime } from "../../../api/axiosApi";
@Component({
  components: {
    // mavonEditor
  },
})
export default class extends Vue {
    @Prop(String) types!: string;
    private blogList:any
    created(){
        const data = {
            class:this.types
        }
        axiosGet('/api/getBlogList',data,(res:any)=>{
            console.log(res,'res')
            if(res.statusCode===200){
                this.blogList = res.commentList
            }
        })
    }
}
</script>
<style lang="scss" scoped>
@import "src/base.scss";
@import "../../common.scss";
.view-article{
     @include common;
    .card{
        margin-top:200px;
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