<template>
  <demo-sort>
    <basic />
    <four-style />
    <closable />
    <description />
    <icon />
    <close-text />
    <banner />
    <custom-icon />
    <smooth-closed />
  </demo-sort>
</template>
<script lang="ts">
import Banner from './banner.vue';
import Basic from './basic.vue';
import Closable from './closable.vue';
import CloseText from './close-text.vue';
import Description from './description.vue';
import Icon from './icon.vue';
import Style from './style.vue';
import SmoothClosed from './smooth-closed.vue';
import CustomIcon from './custom-icon.vue';
import CN from '../index.md';
import { defineComponent } from 'vue';
export default defineComponent({
  CN,
  components: {
    Basic,
    Banner,
    Closable,
    CloseText,
    Description,
    Icon,
    FourStyle: Style, //style 标签报错
    SmoothClosed,
    CustomIcon,
  },
  setup() {
    return {};
  },
});
</script>
<style>
[id^='components-alert-demo'] .ant-alert {
  margin-bottom: 16px;
}
</style>
