<template>
  <div class="view-technology">
    <view-homepage />
    <PageTop :topInfo="topInfo" />
    <BlogList :blogList="blogList" v-if="flag" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import PageTop from "./components/page-top.vue";
import BlogList from "./components/cardList.vue";
import { getBlogList } from "../../api/commentApi";
@Component({
  components: { PageTop ,BlogList},
})
export default class extends Vue {
  private topInfo = {
    type: "technology",
    label: "技术",
    url: require("../../assets/index/笔记本电脑.png"),
    brief: "种一棵树，最好的时间是十年前，其次是现在",
  };
  private blogList: any;
  private flag = false;
  created() {
    const data = {
      class: "technology",
    };
    getBlogList(data, (res: any) => {
      if (res.statusCode === 200) {
        this.blogList = res.commentList;
        this.blogList= this.blogList.reverse()
        this.flag = true;
      }
    });
  }
}
</script>