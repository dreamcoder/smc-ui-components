<docs>
---
order: 5
title: 带标签的滑块
---

## zh-CN

使用 `marks` 属性标注分段式滑块，使用 `value` 指定滑块位置。当 `included=false` 时，表明不同标记间为并列关系。当 `step=null` 时，Slider 的可选值仅有 `marks` 标出来的部分。

</docs>

<template>
  <div id="components-slider-demo-mark">
    <h4>included=true</h4>
    <j-slider v-model:value="value1" :marks="marks">
      <template #mark="{ label, point }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>{{ label }}</template>
      </template>
    </j-slider>
    <j-slider v-model:value="value2" range :marks="marks">
      <template #mark="{ label, point }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>{{ label }}</template>
      </template>
    </j-slider>

    <h4>included=false</h4>
    <j-slider v-model:value="value3" :marks="marks" :included="false">
      <template #mark="{ label, point }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>{{ label }}</template>
      </template>
    </j-slider>

    <h4>marks & step</h4>
    <j-slider v-model:value="value4" :marks="marks" :step="10">
      <template #mark="{ label, point }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>{{ label }}</template>
      </template>
    </j-slider>

    <h4>step=null</h4>
    <j-slider v-model:value="value5" :marks="marks" :step="null">
      <template #mark="{ label, point }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>{{ label }}</template>
      </template>
    </j-slider>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref<number>(37);
    const value2 = ref<[number, number]>([26, 37]);
    const value3 = ref<number>(37);
    const value4 = ref<number>(37);
    const value5 = ref<number>(37);
    const marks = ref<Record<number, any>>({
      0: '0°C',
      26: '26°C',
      37: '37°C',
      100: {
        style: {
          color: '#f50',
        },
        label: '100°C',
      },
    });

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      marks,
    };
  },
});
</script>
<style scoped>
#components-slider-demo-mark h4 {
  margin: 0 0 16px;
}
#components-slider-demo-mark .ant-slider-with-marks {
  margin-bottom: 44px;
}
</style>
