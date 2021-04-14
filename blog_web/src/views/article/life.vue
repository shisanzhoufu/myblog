<template>
<div class="view-life">
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
            type:'life',
            label:'生活',
            url:require('../../assets/index/蛋糕.png'),
            brief:'人间烟火气，最抚凡人心'
        }
}
</script>