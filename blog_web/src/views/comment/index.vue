<template>
<div class="view-comment">
  <view-homepage/>
    <PagePub/>
    <PageList/>
</div>
</template>
<style lang="scss">


</style>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import PagePub from "./components/page-pub.vue";
import PageList from "./components/page-list.vue";
@Component({
  components: {
    PagePub,
    PageList
  }
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
