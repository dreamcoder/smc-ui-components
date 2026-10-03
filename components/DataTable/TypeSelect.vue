<template>
    <TypeSelect
        v-model:value="innerValue"
        v-bind="$attrs"
        :filter="filter"
        @valueChange="onChange"
    />
</template>

<script setup lang="ts" name="DataTableTypeSelect">
import TypeSelect from './components/Type/index.vue';

const props = defineProps({
    value: {
        type: String,
        default: undefined,
    },
    filter: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:value', 'change']);

const innerValue = ref<{ type?: string }>({ type: props.value });

watch(
    () => props.value,
    (val) => {
        innerValue.value = { type: val };
    },
    { immediate: true },
);

const onChange = (val: { type?: string }) => {
    emit('update:value', val?.type);
    emit('change', val?.type);
};
</script>
