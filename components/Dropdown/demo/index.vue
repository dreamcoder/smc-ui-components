<template>
  <demo-sort>
    <basic />
    <context-menu />
    <dropdown-button />
    <event />
    <item />
    <overlay-visible />
    <placement />
    <sub-menu />
    <trigger />
    <loadingVue />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CN from '../index.md';
import Basic from './basic.vue';
import ContextMenu from './context-menu.vue';
import DropdownButton from './dropdown-button.vue';
import Event from './event.vue';
import Item from './item.vue';
import OverlayVisible from './overlay-visible.vue';
import Placement from './placement.vue';
import SubMenu from './sub-menu.vue';
import Trigger from './trigger.vue';
import loadingVue from './loading.vue';

export default defineComponent({
  CN,
  components: {
    loadingVue,
    Basic,
    ContextMenu,
    DropdownButton,
    Event,
    Item,
    OverlayVisible,
    Placement,
    SubMenu,
    Trigger,
  },
});
</script>
