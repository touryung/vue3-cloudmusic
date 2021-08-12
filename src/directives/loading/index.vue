<template>
  <!-- 此文件没用，用模板渲染函数替代 -->
  <div class="loading" v-if="visible" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "loading",
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 66666;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: $active-color;
    opacity: 0.6;
    animation: loading 1.6s ease-in infinite;
  }

  &::after {
    animation-delay: -0.8s;
  }
}
@keyframes loading {
  50% {
    transform: scale(0);
  }
}
</style>
