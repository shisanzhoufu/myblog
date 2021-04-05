<template>
<div class="view-index ">
  <view-homepage/>
  <CardList/>
  <!-- <PageArticle/> -->
  <!-- <PageIntrest/> -->
</div>
</template>
<style lang="scss">

.view-index {
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import CardList from "./components/cardList.vue";
// import PageIntrest from "./components/page-intrest.vue";
// import PageArticle from "./components/page-article.vue";
@Component({
  components: {CardList}
})
export default class extends Vue {
  underStyle: any = {};
  mounted() {
    const under = document.getElementsByClassName("view-index__under")[0];
    if (under) {
      this.underStyle = {
        // 总宽度-单个page的宽度
        bottom: -under.clientHeight + 600 + "px",
        position: "sticky"
      };
    }
  }
}
</script>
