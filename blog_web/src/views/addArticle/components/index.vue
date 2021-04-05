<template>
    <div class="view-add">
      <h1>文章发布</h1>
        <mavonEditor
  :subfield="false"
  :autofocus="false"
  v-model="formData.content"
  ref="md"
  style="width: 99%;"
 />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator"
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
@Component({
  components: {mavonEditor}
})
export default class extends Vue {
}
// 导入组件 及 组件样式

</script>
