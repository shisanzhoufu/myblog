<template>
<div class="view-index ">
  <view-homepage/>
  <!-- <PageTop :types="types"/> -->
  <!-- <CardList :types="types"/> -->

  <!-- <PageArticle/> -->
  <!-- <PageIntrest/> -->
</div>
</template>
<style lang="scss">

.view-index {
}
</style>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component,Prop, Watch } from "vue-property-decorator";
import CardList from "./components/cardList.vue";
import PageTop from "./components/page-top.vue";
// import PageArticle from "./components/page-article.vue";
@Component({
  components: {CardList,PageTop}
})
export default class extends Vue {
  underStyle: any = {};
  private types:any
  created() {
    const under = document.getElementsByClassName("view-index__under")[0];
    if (under) {
      this.underStyle = {
        // 总宽度-单个page的宽度
        bottom: -under.clientHeight + 600 + "px",
        position: "sticky"
      };
    }
    this.types = this.$route.query.types
  }
  
}
</script>

