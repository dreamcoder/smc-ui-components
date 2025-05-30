<docs>
---
order: 4
title: 不可选择日期和时间
---

## zh-CN

可用 `disabledDate` 和 `disabledTime` 分别禁止选择部分日期和时间，其中 `disabledTime` 需要和 `showTime` 一起使用。

</docs>

<template>
  <j-space direction="vertical">
    <j-date-picker
      v-model:value="value1"
      format="YYYY-MM-DD HH:mm:ss"
      :disabled-date="disabledDate"
      :disabled-time="disabledDateTime"
      :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
    />
    <j-date-picker v-model:value="value2" :disabled-date="disabledDate" picker="month" />
    <j-range-picker v-model:value="value3" :disabled-date="disabledDate" />
    <j-range-picker
      v-model:value="value4"
      style="width: 400px"
      :disabled-date="disabledDate"
      :disabled-time="disabledRangeTime"
      :show-time="{
        hideDisabledOptions: true,
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
      }"
      format="YYYY-MM-DD HH:mm:ss"
    />
  </j-space>
</template>
<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const range = (start: number, end: number) => {
      const result = [];

      for (let i = start; i < end; i++) {
        result.push(i);
      }

      return result;
    };

    const disabledDate = (current: Dayjs) => {
      // Can not select days before today and today
      return current && current < dayjs().endOf('day');
    };

    const disabledDateTime = () => {
      return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    };

    const disabledRangeTime = (_: Dayjs, type: 'start' | 'end') => {
      if (type === 'start') {
        return {
          disabledHours: () => range(0, 60).splice(4, 20),
          disabledMinutes: () => range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    };

    return {
      dayjs,
      value1: ref<Dayjs>(),
      value2: ref<Dayjs>(),
      value3: ref<[Dayjs, Dayjs]>(),
      value4: ref<[Dayjs, Dayjs]>(),
      disabledDate,
      disabledDateTime,
      disabledRangeTime,
    };
  },
});
</script>
