<template>
    <demo-sort>
        <basic />
        <color />
        <pending />
        <custom />
        <alternate />
        <right />
    </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import Color from './color.vue';
import Pending from './pending.vue';
import Custom from './custom.vue';
import Alternate from './alternate.vue';
import Right from './right.vue';
import CN from '../index.md';
import { defineComponent } from 'vue';
export default defineComponent({
    CN,
    components: {
        Basic,
        Color,
        Pending,
        Custom,
        Alternate,
        Right,
    },
    setup() {
        return {};
    },
});
</script>
