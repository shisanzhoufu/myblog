<template>
    <div class="view-add" @click="cancelPop($event)">
      <!-- <view-homepage/> -->
      <div class="add_title">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <el-button type="primary" plain >草稿箱</el-button>
        <div class="pub" @click.stop="showCard">
          <el-button type="primary">保存文章</el-button>
          <div class="add_pub" v-show="isShow">
            <div class="tabs_title" >
                  发布文章
            </div>
            <div class="tabs_brife">
              分类
            </div>
            <div class="add_classify">
              <el-tag
              class="tabs"
              v-for="(item,index) in items"
              :key="item.label"
              :type="item.type"
              effect="dark"
              :class = "{'ischecked' : index === selectTypeIndex}"
              @click="showChecked(index)">
              {{ item.label }}
            </el-tag>
        </div>
        <div class="tabs_brife">
              标签
            </div>
        <div class="add_tabs">
          <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </div>   
          </div>
        </div>
        
      </div>      
      <template>
      <v-md-editor
        v-model="text"
        class="md"
        left-toolbar="undo redo | tip"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        height="600px"
      />
    </template>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator"
import {Warning} from "../../api/message"
import {axiosPost} from "../../api/axiosApi"
import {handlePaste} from "../../plugins/image-handle-paste/image-handle-paste"
@Component({
  components: {
    // mavonEditor
  }
})
const text = `::: tip
  你可以点击 toolbar 中的 tip 来快速插入
:::

::: warning
  这是一段警告
:::

::: danger
  这是一个危险警告
:::

::: details
  这是一个详情块，在 IE / Edge 中不生效
:::

::: tip 自定义标题
  你也可以自定义块中的标题
:::

::: danger STOP
  危险区域，禁止通行
:::
`;
export default class extends Vue {
  private items= [
      { type: 'interest', label: '兴趣' },
      { type: 'technology', label: '技术' },
      { type: 'life', label: '生活' }
    ]
  private dynamicTags = []
  private inputVisible = false
  private inputValue = ''
  private isShow = false
  private isChecked = false
  private text:any
  private title =''
  private insertImage:any
  private selectTypeIndex = -1 //控制按钮点亮状态，-1为默认不点亮
  
  private showCard() {
    this.isShow = true
  }
  
  private showChecked(index:any){
    this.selectTypeIndex = index
    console.log(this.selectTypeIndex)
  }
  private cancelPop(event:any) {
	      const tp = document.querySelector(".add_pub");
	      if (tp) {
	        if (!tp.contains(event.target)) {
	          this.isShow = false;
	        }
	      }
    	}
  //删除标签
  private handleClose(tag: any){
    console.log(tag)
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
  }
   private showInput(){
     this.inputVisible = true
     this.$nextTick(() => {
       this.$refs.saveTagInput.$refs.input.focus()
     })
   }
   private handleInputConfirm(){
        const inputValue = this.inputValue
        if (inputValue) {
          // this.dynamicTags.push(inputValue)
          if(this.dynamicTags.length>0){
            this.dynamicTags.forEach((item:any)=>{
              if(inputValue !== item){
                this.dynamicTags.push(inputValue)
              }
            })
          }else{
            this.dynamicTags.push(inputValue)
          }
          
        }
        this.inputVisible = false
        this.inputValue = ''
      }

      mounted(){
        // document.addEventListener('paste', handlePaste)
        // handlePaste
      }
  //md 上传图片
  private handleUploadImage(event: any,insertImage:any, files: any) {
    // console.log(event)
    handlePaste(event,insertImage)
      
    }
    
}
</script>

<style lang='scss'>
@import "src/base.scss";
@import "../common.scss";
.view-add{
  .add_title{
    display: flex;
    .el-input__inner{
        position: relative;
        background: none;
        border: none;
        border-radius: 0px;
        height: 60px;
        font-size: 30px;
        // border-bottom: 2px solid $c-medium;
        margin-bottom: 30px;
        color: $c-main;
        padding:20px;
    }
    .el-button {
      height:50px;
      width: 100px;
      margin-top:10px;
      margin-right: 20px;
          
        }
      .el-button--primary {
        color: #ffffff;
        background: $c-main;
        border-color: $c-main;
        }
      .el-button--primary.is-plain{
        color: $c-main;
        background: $c-white;
        border-color: $c-main;
      }
      
  }
  .pub{
    .add_pub{
    z-index: 3;
    width: 300px;
    min-height: 350px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
    border-radius: 8px;
    position: absolute;
    top: 91px;
    right: 30px;
    padding:30px;
  }
    
    .tabs_title{
      font-size: 30px;
      font-family: SourceHanSans-Bold, SourceHanSans;
      font-weight: bold;
      color: $c-main;
      line-height: 40px;
    }
    .tabs_brife{
      font-size: 20px;
      font-family: SourceHanSans-Bold, SourceHanSans;
      font-weight: bold;
      color: $c-medium;
      line-height: 30px;
      margin-top: 10px;
    }
    .add_classify{
      margin:30px 0px;
      display: flex;
      width: 300px;
    .el-tag{
      margin-right:10px;
      cursor: pointer;
    }
    .ischecked{
      color: #ffffff!important;
      background-color:$c-main!important;
      border-color: $c-main!important;
    }
    
  }
 
  .el-tag--dark{
    background-color: $c-white;
    border-color: $c-light;
    color: $c-light;
    font-size:unset;
  }
   
  .el-icon-close:before{
    color: $c-light;
    background-color: $c-white;
  }
  .add_tabs{
    .el-tag {
      cursor: pointer;
      margin:30px 0px;
      background-color: $c-white;
      border-color: $c-light;
      color: $c-light;
      margin-right:10px;
    }
    .button-new-tag {
      margin:unset;
      margin:30px 0;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
      &:hover{
        background-color: $c-white;
        border-color: $c-light;
        color: $c-light;
      }
    }
    .el-input__inner{
      padding: 5px;
      height:unset;
      margin:unset;
      border:2px solid $c-light;
      margin:30px 0;
      height: 32px;
      font-size: 14px;
      font-family: SourceHanSans-Bold, SourceHanSans;
      font-weight: 400;
      }
    .input-new-tag {
      width: 90px;
      vertical-align: bottom;
  }
    }
  }
  
}
</style>

function insertImage(arg0: { url: any; desc: string; }) {
  throw new Error("Function not implemented.");
}

function insertImage(arg0: { url: any; desc: string; }) {
  throw new Error("Function not implemented.");
}
