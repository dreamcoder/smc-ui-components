<docs>
---
order: 28
title: 单元格自动省略
---

## zh-CN

设置 `column.ellipsis` 可以让单元格内容根据宽度自动省略。
> 列头缩略暂不支持和排序筛选一起使用。

</docs>

<template>
    <j-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
            </template>
        </template>
    </j-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 80,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address 1',
        ellipsis: true,
    },
    {
        title: 'Long Column Long Column Long Column',
        dataIndex: 'address',
        key: 'address 2',
        ellipsis: true,
    },
    {
        title: 'Long Column Long Column',
        dataIndex: 'address',
        key: 'address 3',
        ellipsis: true,
    },
    {
        title: 'Long Column',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true,
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 2 Lake Park, London No. 2 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default defineComponent({
    setup() {
        return {
            data,
            columns,
        };
    },
});
</script>
