<template>
  <div id="right-bottom">

  </div>
</template>

<script>
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { CloseOutlined } from '@ant-design/icons-vue';
const isEffective = (start, end) => {
  return dayjs().isBetween(start, end);
};
export default {
  components: {
    CloseOutlined,
  },
  data() {
    return {
      isEffective,
      visible: true,
      v: dayjs().date(),
      ads: [
        {
          alt: 'geektime',
          img: 'https://qn.antdv.com/geektime-web-small.jpg',
          href: 'http://gk.link/a/10l8O',
          visible: isEffective('2020-09-03 10:00:00', '2020-10-04 10:00:00'),
        },
        {
          alt: 'powerproject',
          img: 'https://qn.antdv.com/powerproject.jpeg?v=20200327',
          href: 'http://www.powerproject.com.cn',
          visible: isEffective('2020-03-27 17:00:00', '2020-09-28 17:00:00'),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#right-bottom {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 150px;
  .close {
    position: absolute;
    text-align: center;
    top: -8px;
    right: -8px;
    font-size: 16px;
    padding: 15px;
    color: #6e3041;
  }
}
</style>
