<docs>
---
order: 13
title: 高级搜索
---

## zh-CN

三列栅格式的表单排列方式，常用于数据表格的高级搜索。

有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

## en-US

Three columns layout is often used for advanced searching of data table.

Because the width of label is not fixed, you may need to adjust it by customizing its style.

</docs>
<template>
  <div>
    <j-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <j-row :gutter="24">
        <template v-for="i in 10" :key="i">
          <j-col v-show="expand || i <= 6" :span="8">
            <j-form-item
              :name="`field-${i}`"
              :label="`field-${i}`"
              :rules="[{ required: true, message: 'input something' }]"
            >
              <j-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"></j-input>
            </j-form-item>
          </j-col>
        </template>
      </j-row>
      <j-row>
        <j-col :span="24" style="text-align: right">
          <j-button type="primary" html-type="submit">Search</j-button>
          <j-button style="margin: 0 8px" @click="() => formRef.resetFields()">Clear</j-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            Collapse
          </a>
        </j-col>
      </j-row>
    </j-form>
    <div class="search-result-list">Search Result List</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
export default defineComponent({
  components: {
    DownOutlined,
    UpOutlined,
  },
  setup() {
    const expand = ref(false);
    const formRef = ref<FormInstance>();
    const formState = reactive({});
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      console.log('formState: ', formState);
    };
    return {
      formRef,
      formState,
      expand,
      onFinish,
    };
  },
});
</script>

<style>
#components-Form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-Form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[datj-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[datj-theme='dark'] #components-Form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
</style>
