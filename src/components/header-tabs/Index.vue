<template>
  <ul class="tabs">
    <li
      class="tabs-item"
      :class="{ active: tabItem.path === currentItem }"
      v-for="tabItem in tabList"
      :key="tabItem.path"
      @click="handleChangeActive(tabItem.path)"
    >
      {{ tabItem.content }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    tabList: {
      type: Array as PropType<TabItem[]>,
      default: () => [],
    },
    currentItem: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ["tab-change"],
  setup(props, { emit }) {
    const handleChangeActive = (path) => {
      emit("tab-change", path);
    };

    return { handleChangeActive };
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  position: absolute;
  z-index: 6;
  width: 100%;
  height: $tab-height;
  display: flex;
  align-items: center;
  background: #fff;

  .tabs-item {
    margin-right: 25px;
    cursor: pointer;

    &.active {
      position: relative;
      font-size: 20px;
      font-weight: bold;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        margin: auto;
        width: 80%;
        height: 3px;
        background: $primary-color;
        border-radius: 4px;
      }
    }
  }
}
</style>
