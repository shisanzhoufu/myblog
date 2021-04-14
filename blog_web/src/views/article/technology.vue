<template>
<div class="view-technology">
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
            type:'technology',
            label:'技术',
            url:require('../../assets/index/笔记本电脑.png'),
            brief:'种一棵树，最好的时间是十年前，其次是现在'
        }
}
</script>