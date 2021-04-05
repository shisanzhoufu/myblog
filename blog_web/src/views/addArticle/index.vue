<template>
<div class="view-index ">
  <view-homepage/>
  <CardList/>
</div>
</template>
<style lang="scss">

</style>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import CardList from "./components/index.vue";
@Component({
  components: {CardList}
})
export default class extends Vue {
}
</script>
