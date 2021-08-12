<template>
  <div v-if="isActive" class="tabs-pane" :id="`pane-${navName}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  PropType,
} from "vue";
import { RootTabs, UpdatePaneCallback } from "./type";

export default defineComponent({
  name: "tab-pane",
  props: {
    label: {
      type: String as PropType<string>,
      default: "",
    },
    name: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props) {
    // 获取当前导航
    const rootTabs = inject<RootTabs>("rootTabs");
    // 计算得当前导航
    const navName = computed<any>(() => props.name);
    // 计算当前内容是否显示
    const isActive = computed<boolean>(
      () => rootTabs.currentName.value === navName.value
    );

    // 获取当前实例
    const instance = getCurrentInstance();

    const updatePaneState = inject<UpdatePaneCallback>("updatePaneState");
    updatePaneState({
      uid: instance.uid,
      // @ts-ignore
      props, // 传递 label 和 name
      instance,
      navName,
      isActive,
    });

    return { isActive, navName };
  },
});
</script>

<style lang="scss" scoped></style>
