<template>
    <div class="art-top">
        <div class="container">
        <div class="title"> 
            <img :src='topInfo.url' alt=""> <span>{{topInfo.label}}</span> </div>
        <div class="brief">{{topInfo.brief}}</div>
        <!-- <div class="num">共10篇文章</div> -->
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
  },
})
export default class extends Vue {
    @Prop(Object) topInfo!: object;
    // private topList = [
    //     {
    //         type:'interest',
    //         label:'兴趣',
    //         url:require('../../../assets/index/行李箱 (1).png'),
    //         brief:'永远理想主义，永远浪漫主义'
    //     },
    //     {
    //         type:'technology',
    //         label:'技术',
    //         url:require('../../../assets/index/笔记本电脑.png'),
    //         brief:'种一棵树，最好的时间是十年前，其次是现在'
    //     },
    //     {
    //         type:'life',
    //         label:'生活',
    //         url:require('../../../assets/index/蛋糕.png'),
    //         brief:'人间烟火气，最抚凡人心'
    //     }
    // ]
    
    created(){
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
.art-top{
 @include common;
 margin-top:100px;
 .title{
     display: flex;
     justify-content: center;
     align-items: center;
     img{
         width: 100px;
         height:100px;
     }
     span{
         font-size: 43px;
         color: $c-medium;
         font-weight: 300;
         letter-spacing: 10px;
     }
 }
 .brief{
     display: flex;
     justify-content: center;
     align-items: center;
     margin: 10px 0;
      font-size: 20px;
         color: $c-medium;
         font-weight: 400;
         letter-spacing: 5px;
 }
//  .num{
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      margin: 10px 0;
//       font-size: 20px;
//          color: $c-medium;
//          font-weight: 400;
//          letter-spacing: 5px;
//  }
}
</style>