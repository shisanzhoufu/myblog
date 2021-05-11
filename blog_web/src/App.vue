<template>
  <div id="app">
    <router-view />
    <Waves/>
  </div>
</template>

<style lang="scss">
@import "../src/assets/iconfont/icon.scss";

body {
  margin: 0;
  background-color: rgb(245, 245, 245);
  cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/pointer.cur),auto;
  ::selection {
    color: #fff;
    background: #437db3;
}
}
</style>
<script lang="ts">
import Waves from "../src/components/basic/wave/index"
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
@Component({
  components: {Waves},
})
export default class extends Vue {
  
}
</script>
