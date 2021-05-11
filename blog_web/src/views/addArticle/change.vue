<template>
  <div class="view-change" @click="cancelPop($event)">
    <!-- <view-homepage/> -->
    <!-- 标题栏 -->
    <div class="add_title">
      <el-input v-model="title" maxlength="20" placeholder="请输入标题"></el-input>
      <!-- 两个按钮 -->
      <!-- <el-button type="primary" plain>草稿箱</el-button> -->
      <div class="pub" @click.stop="showCard">
        <el-button type="primary">保存文章</el-button>
        <!-- 发布文章的标签卡片 -->
        <div class="add_pub" v-show="isShow">
          <div class="tabs_title">发布文章</div>
          <div class="tabs_brife">分类</div>
          <div class="add_classify">
            <el-tag
              class="tabs"
              v-for="(item, index) in items"
              :key="item.label"
              :type="item.type"
              effect="dark"
              :class="{ ischecked: index === selectTypeIndex }"
              @click="showChecked(index)"
            >
              {{ item.label }}
            </el-tag>
          </div>
          <div class="tabs_brife">标签</div>
          <div class="add_tabs">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
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
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ 添加标签</el-button
            >
          </div>
          <el-button type="primary" class="pubBtn" @click="publish"
            >确认并发布</el-button
          >
        </div>
      </div>
    </div>
    <template>
      <mavon-editor
        ref="md"
        @imgAdd="imgAdd"
        v-model="value"
        :ishljs = "true"
        @change="handle"
      ></mavon-editor>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Warning, Success, Error } from "../../api/message";
import { axiosPost, axiosGet, formatDateTime } from "../../api/axiosApi";
import { handlePaste } from "../../plugins/image-handle-paste/image-handle-paste";
import { updateBlog } from "../../api/commentApi";

@Component({
  components: {
    // mavonEditor
  },
})
export default class extends Vue {
  private blog: any;
  private items = [
    { type: "interest", label: "兴趣" },
    { type: "technology", label: "技术" },
    { type: "life", label: "生活" },
  ];
  private dynamicTags = [];
  private inputVisible = false;
  private inputValue = "";
  private isShow = false;
  private isChecked = false;
  private value = "";
  private title = "";
  private insertImage: any;
  private selectTypeIndex = -1; //控制按钮点亮状态，-1为默认不点亮
  private mdStr: "### demo \n ![image](0)";
  private myhtml: any;
  private class: any;
  created() {
    this.blog = this.$route.params.blog;
    this.title = this.blog.blog_title;
    this.value = this.blog.blog_md;
    this.dynamicTags = this.blog.blog_tag.split(",");
    if (this.blog.blog_class === "interest") {
      this.selectTypeIndex = 0;
    } else if (this.blog.blog_class === "technology") {
      this.selectTypeIndex = 1;
    } else {
      this.selectTypeIndex = 2;
    }
  }
  //保存文章
  private showCard() {
    if (this.title === "") {
      Warning(this, "标题不能为空");
      return;
    }
    if (this.value === "") {
      Warning(this, "内容不能为空");
      return;
    }
    this.isShow = true;
  }
  private publish() {
    const time = formatDateTime();
    const data = {
      id: this.blog.blog_id,
      title: this.title,
      tags: this.dynamicTags,
      class: this.class,
      html: this.myhtml,
      md: this.value,
      time: time,
    };
    updateBlog(data, (res: any) => {
      if (res.statusCode === 200) {
        Success(this, "更新成功~");
        const blog = res.result
        this.$router.push({ name: "blog", params: { blog: blog } });
      } else {
        Error(this, "更新失败~");
      }
    });
  }
  private handle(value: any, render: any) {
    this.myhtml = render;
  }
  private showChecked(index: any) {
    this.selectTypeIndex = index;
    this.class = this.items[index].type;
  }
  private cancelPop(event: any) {
    const tp = document.querySelector(".add_pub");
    if (tp) {
      if (!tp.contains(event.target)) {
        this.isShow = false;
      }
    }
  }
  //删除标签
  private handleClose(tag: any) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  }
  private showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  }
  private handleInputConfirm() {
    const inputValue = this.inputValue;
    if (inputValue) {
      // this.dynamicTags.push(inputValue)
      if (this.dynamicTags.length > 0) {
        this.dynamicTags.forEach((item: any) => {
          if (inputValue !== item) {
            this.dynamicTags.push(inputValue);
          }
        });
      } else {
        this.dynamicTags.push(inputValue);
      }
    }
    this.inputVisible = false;
    this.inputValue = "";
  }
  /**
   * md上传图片
   */
  private imgAdd(pos: any, file: any) {
    console.log(file, "md");
    // 第一步.将图片上传到服务器.
    const form = new FormData();
    form.append("file", file);
    axiosPost(
      "/api/upload",
      form,
      (res: any) => {
        console.log(res);
        this.$refs.md.$img2Url(pos, res);
      },
      { headers: { "content-type": "multipart/form-data" } }
    );
  }
}
</script>

<style lang='scss'>
@import "src/base.scss";
@import "../common.scss";
.view-change {
  .add_title {
    display: flex;
    .el-input__inner {
      position: relative;
      background: none;
      border: none;
      border-radius: 0px;
      height: 60px;
      font-size: 25px;
      // border-bottom: 2px solid $c-medium;
      // margin-bottom: 15px;
      color: $c-main;
      padding: 20px;
    }
    .el-button {
      height: 40px;
      width: 80px;
      margin-top: 10px;
      margin-right: 20px;
      display: flex;
      justify-content: center;
    }
    .el-button--primary {
      color: #ffffff;
      background: $c-main;
      border-color: $c-main;
    }
    .el-button--primary.is-plain {
      color: $c-main;
      background: $c-white;
      border-color: $c-main;
    }
  }
  .v-note-panel{
    min-height:500px;
  }
  .pub {
    .add_pub {
      z-index: 1600;
      width: 300px;
      min-height: 350px;
      background: #ffffff;
      box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
      border-radius: 8px;
      position: absolute;
      top: 81px;
      right: 30px;
      padding: 30px;
    }
    .pubBtn{
      position: absolute;
      bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      right:10px;
      padding: 0px;
    }
    .tabs_title {
      font-size: 30px;
      font-family: SourceHanSans-Bold, SourceHanSans;
      font-weight: bold;
      color: $c-main;
      line-height: 40px;
    }
    .tabs_brife {
      font-size: 20px;
      font-family: SourceHanSans-Bold, SourceHanSans;
      font-weight: bold;
      color: $c-medium;
      line-height: 30px;
      margin-top: 10px;
    }
    .add_classify {
      margin: 30px 0px;
      display: flex;
      width: 300px;
      .el-tag {
        margin-right: 10px;
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
      }
      .ischecked {
        color: #ffffff !important;
        background-color: $c-main !important;
        border-color: $c-main !important;
      }
    }

    .el-tag--dark {
      background-color: $c-white;
      border-color: $c-light;
      color: $c-light;
      font-size: unset;
    }

    .el-icon-close:before {
      color: $c-light;
      background-color: $c-white;
    }
    .add_tabs {
      display: flex;
      .el-tag {
        cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
        margin: 30px 0px;
        background-color: $c-white;
        border-color: $c-light;
        color: $c-light;
        margin-right: 10px;
      }
      .button-new-tag {
        margin: unset;
        margin: 30px 0;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        &:hover {
          background-color: $c-white;
          border-color: $c-light;
          color: $c-light;
        }
      }
      .el-input__inner {
        padding: 5px;
        height: unset;
        margin: unset;
        border: 2px solid $c-light;
        margin: 30px 0;
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

