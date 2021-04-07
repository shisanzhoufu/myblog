<template>
    <div class="view-add">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark">
        {{ item.label }}
      </el-tag>
      <!-- <mavon-editor ref="md"  v-model="markdownForm.contentMarkdown" :codeStyle="markdown.codeStyle" :toolbars="markdown.toolbars"   /> -->
      <v-md-editor v-model="text" height="600px"></v-md-editor>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator"
// import { mavonEditor } from "mavon-editor"

@Component({
  components: {
    // mavonEditor
  }
})

export default class extends Vue {
 private items= [
          { type: '', label: '标签一' },
          { type: 'success', label: '标签二' },
          { type: 'info', label: '标签三' },
          { type: 'danger', label: '标签四' },
          { type: 'warning', label: '标签五' }
        ]

}
</script>
