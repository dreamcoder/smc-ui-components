<template>
    <PopoverModal
        v-model:visible="visible"
        :placement="placement"
        @ok="onOk"
        @cancel="onCancel"
    >
        <template #content>
            <div :style="{ width: width || '700px' }">
                <EditTable
                    ref="tableRef"
                    :validateRowKey="true"
                    :columns="tableColumns"
                    :dataSource="dataSource"
                    :pagination="false"
                    :height="200"
                >
                    <template v-for="column in editableColumns" :key="column.dataIndex" #[column.dataIndex]="slotData">
                        <EditTableFormItem
                            v-if="column.dataIndex !== 'action'"
                            :name="[slotData.index, column.dataIndex]"
                        >
                            <slot
                                v-if="$slots[column.dataIndex]"
                                :name="column.dataIndex"
                                v-bind="{ data: slotData }"
                            />
                            <component
                                v-else-if="column.type === 'components' && column.components?.name"
                                :is="column.components.name"
                                v-bind="column.components.props || {}"
                                v-model:value="slotData.record[column.dataIndex]"
                            />
                            <Input
                                v-else-if="column.type === 'text'"
                                v-model:value="slotData.record[column.dataIndex]"
                                :placeholder="`请输入${column.title}`"
                            />
                        </EditTableFormItem>
                        <a-button
                            v-else
                            danger
                            type="link"
                            style="padding: 0 5px"
                            @click="() => deleteItem(slotData.index)"
                        >
                            <template #icon>
                                <AIcon type="DeleteOutlined" />
                            </template>
                        </a-button>
                    </template>
                </EditTable>
                <Button style="width: 100%; margin-top: 4px" @click="handleAdd">
                    <template #icon><AIcon type="PlusOutlined" /></template>
                    新增
                </Button>
            </div>
        </template>
        <slot>
            <Button type="link" :disabled="disabled" style="padding: 0" class="j-data-table-config--icon">
                <template #icon>
                    <AIcon type="SettingOutlined" />
                </template>
                配置
            </Button>
        </slot>
    </PopoverModal>
</template>

<script setup lang="ts" name="DataTableObject">
import { Form } from 'ant-design-vue';
import { cloneDeep, omit } from 'lodash-es';
import EditTable from './Table.vue';
import EditTableFormItem from './TableFormItem.vue';
import PopoverModal from './components/Popover/index.vue';
import Input from '../Input';
import Button from '../Button';
import AIcon from '../AIcon';

const props = defineProps({
    value: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        default: () => [],
    },
    placement: {
        type: String,
        default: 'top',
    },
    width: {
        type: [String, Number],
        default: '700px',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    onAdd: {
        type: Function,
        default: undefined,
    },
});

const emit = defineEmits(['update:value', 'confirm', 'cancel']);
const formItemContext = Form.useInjectFormItemContext();

const tableRef = ref();
const visible = ref(false);
const dataSource = ref<any[]>([]);

const editableColumns = computed(() => props.columns.filter((item: any) => !!item?.dataIndex));

const tableColumns = computed(() => editableColumns.value);

const defaultAddItem = () => ({
    id: undefined,
    name: undefined,
    valueType: {},
    expands: {
        required: false,
    },
});

const handleAdd = () => {
    dataSource.value.push(props.onAdd ? props.onAdd() : defaultAddItem());
};

const deleteItem = (index: number) => {
    dataSource.value.splice(index, 1);
};

const onOk = async () => {
    const data = await tableRef.value?.validate?.();
    if (data) {
        visible.value = false;
        emit('update:value', data);
        emit('confirm', data);
        formItemContext.onFieldChange?.();
    }
};

const onCancel = () => {
    emit('cancel');
};

watch(
    () => [JSON.stringify(props.value), visible.value],
    () => {
        if (visible.value) {
            dataSource.value = cloneDeep(props.value || []);
        }
    },
    { immediate: true },
);
</script>

<style scoped></style>
