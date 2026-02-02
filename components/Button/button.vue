<template>
    <Button v-bind="buttonAttrs" :class="[className]">
        <AIcon v-if="props.myIcon" :type="props.myIcon" />
        <slot name="icon"></slot>
        <slot name="default"></slot>
    </Button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Button } from 'ant-design-vue';
import type { ButtonType } from 'ant-design-vue/es/button/buttonTypes';
import { AIcon } from '../components';
import { buttonProps } from 'ant-design-vue/lib/button/buttonTypes';
import { computed } from 'vue';

const props = defineProps({
    ...buttonProps(),
    type: {
        type: String as PropType<
            | 'primary'
            | 'default'
            | 'dashed'
            | 'link'
            | 'text'
            | 'stroke'
            | 'icon-danger'
        >,
        default: 'default',
    },
    iconDanger: {
        type: Boolean,
        default: false,
    },
    myIcon: {
        type: String,
        default: '',
    },
});

const className = computed(() => {
    return {
        'custom-button': true,
        'stroke-btn': String(props.type) === 'stroke',
        'icon-danger': String(props.type) === 'icon-danger',
    };
});

// stroke、icon-danger 为自定义 type，传给 AButton 时转为 default
const buttonAttrs = computed(() => {
    const type = props.type as string;
    const resolvedType: ButtonType =
        type === 'stroke' || type === 'icon-danger'
            ? 'default'
            : (type as ButtonType);
    const { iconDanger, myIcon, ...rest } = props;
    return { ...rest, type: resolvedType };
});
</script>

<script lang="ts">
export default {
    __ANT_BUTTON: true,
};
</script>
