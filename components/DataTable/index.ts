import type { App } from 'vue';
import EditTable from './Table.vue';
import TypeSelectComponent from './TypeSelect.vue';
import ObjectComponent from './Object.vue';
import {
    ArrayParams,
    BooleanParams,
    DateParams,
    DoubleParams,
    EnumParams,
    FileParams,
    IntegerParams,
    ObjectParams,
    StringParams,
} from './components';

export { TABLE_WRAPPER as FULL_CODE } from './consts';
export * from './components';
export { default as EditTable } from './Table.vue';
export { default as EditTableFormItem } from './TableFormItem.vue';
export { default as EditTableGroup } from './group.vue';

const wrapInstall = (component: any, name: string) => {
    component.name = name;
    component.install = (app: App) => {
        app.component(name, component);
        return app;
    };
    return component;
};

export const DataTable = wrapInstall(EditTable, 'JDataTable');
export const DataTableTypeSelect = wrapInstall(TypeSelectComponent, 'JDataTableTypeSelect');
export const DataTableObject = wrapInstall(ObjectComponent, 'JDataTableObject');
export const DataTableArray = wrapInstall(ArrayParams, 'JDataTableArray');
export const DataTableString = wrapInstall(StringParams, 'JDataTableString');
export const DataTableInteger = wrapInstall(IntegerParams, 'JDataTableInteger');
export const DataTableDouble = wrapInstall(DoubleParams, 'JDataTableDouble');
export const DataTableBoolean = wrapInstall(BooleanParams, 'JDataTableBoolean');
export const DataTableEnum = wrapInstall(EnumParams, 'JDataTableEnum');
export const DataTableFile = wrapInstall(FileParams, 'JDataTableFile');
export const DataTableDate = wrapInstall(DateParams, 'JDataTableDate');

export default DataTable;
