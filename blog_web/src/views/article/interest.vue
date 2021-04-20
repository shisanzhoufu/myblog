<template>
  <div class="view-interest">
    <view-homepage />
    <PageTop :topInfo="topInfo" />
    <BlogList :blogList="blogList" v-if="flag"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import PageTop from "./components/page-top.vue";
import BlogList from "./components/cardList.vue";
import { axiosPost, axiosGet, formatDateTime } from "../../api/axiosApi";
import { getBlogList } from "../../api/commentApi";
@Component({
  components: { PageTop, BlogList },
})
export default class extends Vue {
  private topInfo = {
    type: "interest",
    label: "兴趣",
    url: require("../../assets/index/行李箱 (1).png"),
    brief: "永远理想主义，永远浪漫主义",
  };
  private blogList: any;
  private flag = false
  created() {
    this.getList()
  }
  private getList(){
    const data = {
      class: "interest",
    };
    getBlogList(data, (res: any) => {
      if (res.statusCode === 200) {
        this.blogList = res.commentList;
        this.blogList= this.blogList.reverse()
        this.flag = true
      }
    });
  }
}
</script>