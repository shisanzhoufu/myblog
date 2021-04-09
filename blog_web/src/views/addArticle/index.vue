<template>
    <div class="view-add" @click="cancelPop($event)">
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
        v-on:paste="handlePaste"
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
import {axiosGet} from "../../api/axiosApi"
import {handlePaste} from "../../plugins/image-handle-paste/image-handle-paste"
@Component({
  components: {
    // mavonEditor
  }
})

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
  private text = ''
  private title =''
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
  //md 上传图片
  private handleUploadImage(event: any, files: any) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(event,files);
      let file = handlePaste(event)
      console.log(file)
      if (!file) {
         Warning(this,"请粘贴图片后上传")
        return
  }
      let form = new FormData()
      form.append("file", file)
      axiosGet('/api/upload',form,function(res: any){
          console.log(res)
        })

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
      background-color:rgb(121, 109, 194)!important;
      border-color: rgb(121, 109, 194)!important;
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
