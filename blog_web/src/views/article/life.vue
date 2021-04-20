<template>
  <div class="view-life">
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
  components: { PageTop,BlogList },
})
export default class extends Vue {
  private blogList: any;
  private flag = false
  private topInfo = {
    type: "life",
    label: "生活",
    url: require("../../assets/index/蛋糕.png"),
    brief: "人间烟火气，最抚凡人心",
  };
  created() {
    const data = {
      class: "life",
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