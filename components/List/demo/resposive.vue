<docs>
---
order: 5
title: 响应式的栅格列表
---

## zh-CN

响应式的栅格列表。尺寸与 [Layout Grid](https://www.antdv.com/components/grid-cn/#Col) 保持一致。

</docs>

<template>
  <j-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, xxxl: 2 }"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <j-list-item>
        <j-card :title="item.title">Card content</j-card>
      </j-list-item>
    </template>
  </j-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

export default defineComponent({
  setup() {
    return {
      data,
    };
  },
});
</script>
