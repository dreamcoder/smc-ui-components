<template>
  <demo-sort>
    <basic />
    <multiple />
    <!-- <tree-data /> -->
    <checkable />
    <suffix />
    <async />
    <Highlight />
    <treeLineVue />
    <virtualScrollVue />
    <customTagRenderVue />
    <replaceFieldsVue />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import Multiple from './multiple.vue';
// import TreeData from './treeData.vue';
import Checkable from './checkable.vue';
import Suffix from './suffix.vue';
import Async from './async.vue';
import Highlight from './highlight.vue';
import treeLineVue from './tree-line.vue';
import virtualScrollVue from './virtual-scroll.vue';
import customTagRenderVue from './custom-tag-render.vue';
import replaceFieldsVue from './replaceFields.vue';
import CN from '../index.md';
import { defineComponent } from 'vue';

export default defineComponent({
  CN,
  components: {
    Basic,
    Multiple,
    // TreeData,
    Checkable,
    Suffix,
    Async,
    Highlight,
    treeLineVue,
    virtualScrollVue,
    customTagRenderVue,
    replaceFieldsVue,
  },
  setup() {
    return {};
  },
});
</script>
