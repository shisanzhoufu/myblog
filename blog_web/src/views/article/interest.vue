<template>
<div class="view-interest">
  <view-homepage/>
  <PageTop :topInfo="topInfo"/>
  
</div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component,Watch } from "vue-property-decorator";
import PageTop  from "./components/page-top.vue";
@Component({
  components: {PageTop},
})
export default class extends Vue {
private topInfo = {
            type:'interest',
            label:'兴趣',
            url:require('../../assets/index/行李箱 (1).png'),
            brief:'永远理想主义，永远浪漫主义'
        }
}
</script>