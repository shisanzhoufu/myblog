<template>
<div class="view-index ">
  <view-homepage/>
  <PageTop/>
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
import PageTop from "./components/page-top.vue";
@Component({
  components: {
PageTop
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
