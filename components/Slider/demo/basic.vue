<docs>
---
order: 0
title: 基本
---

## zh-CN

基本滑动条。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。

</docs>

<template>
  <div>
    <j-slider id="test" v-model:value="value1" :disabled="disabled" />
    <j-slider v-model:value="value2" range :disabled="disabled" />
    Disabled:
    <j-switch v-model:checked="disabled" size="small" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref<number>(0);
    const value2 = ref<[number, number]>([20, 50]);
    const disabled = ref<boolean>(false);

    return {
      value1,
      value2,
      disabled,
    };
  },
});
</script>
<style scoped>
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
