import type { Ref } from 'vue';

export const METADATA_UNIT = Symbol('metadata-unit');

export const useGetUnit = () => inject(METADATA_UNIT, ref([])) as Ref<Array<{ label: string; value: string }>>;

export const provideUnitOptions = (options: Ref<Array<{ label: string; value: string }>>) => {
    provide(METADATA_UNIT, options);
};
