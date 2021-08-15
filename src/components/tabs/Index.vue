<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  h,
  watch,
  ComponentInternalInstance,
  VNode,
  Component,
  getCurrentInstance,
  onMounted,
  provide,
} from "vue";
import { NavItem, RootTabs, UpdatePaneCallback } from "./type";
import TabNav from "./TabNav.vue";

export default defineComponent({
  name: "tabs",
  components: {
    TabNav,
  },
  props: {
    activeName: {
      type: String as PropType<string>,
      default: "",
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    labelSize: {
      type: Number as PropType<number>,
      default: 15,
    },
    isAbsolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    isScale: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ["tab-click", "update:modelValue"],
  // @ts-ignore
  setup(props: TabsProps, context) {
    // 当前标签页的操作
    const currentName = ref<string>(
      props.modelValue || props.activeName || "0"
    );
    const setCurrentName = (val: string) => {
      if (currentName.value !== val) {
        currentName.value = val;
        context.emit("update:modelValue", val); // 双向绑定
      }
    };
    watch(
      () => props.activeName,
      (val) => setCurrentName(val)
    );
    watch(
      () => props.modelValue,
      (val) => setCurrentName(val)
    );

    const navItems = ref([]);
    const instance = getCurrentInstance();
    const paneStateMap = new Map();

    // 获取内容组件实例
    const getContentInstance = (
      vNode: VNode,
      contentInstanceList: ComponentInternalInstance[] = []
    ) => {
      // 遍历内容节点的 children 获取每个组件
      Array.from((vNode.children || []) as ArrayLike<VNode>).forEach(
        (node: VNode) => {
          let type = node.type;
          type = (type as Component).name || type;
          // 将 tabpane 加入数组
          if (type === "tab-pane" && node.component) {
            contentInstanceList.push(node.component);
          }
        }
      );
      return contentInstanceList;
    };

    const setContentInstance = () => {
      if (context.slots.default) {
        // 获取当前组件实例的内层的节点
        const children = instance?.subTree.children;

        // 筛选内容部分
        const content = Array.from(children as ArrayLike<VNode>).find(
          ({ props }) => {
            if (props) return props.class === "tabs-content";
          }
        );

        if (!content) return true;
        /**
         * 在 tabpane 组件获取 label
         * 调用 updateState 根据 uid -> state 存入 Map
         * 遍历内容实例数组，根据 uid 取到整个对象信息
         */
        const paneInstanceList = getContentInstance(content).map(
          (contentInstance: ComponentInternalInstance) =>
            paneStateMap.get(contentInstance.uid)
        );

        navItems.value = paneInstanceList;
      }
    };
    onMounted(() => setContentInstance());

    // 响应选项卡点击
    const handleTabClick = (e: Event, navItem: NavItem, tabName: string) => {
      setCurrentName(tabName);
      setStorage(tabName);
      context.emit("tab-click", e, navItem, tabName);
    };

    const setStorage = (tabName: string) => {
      if (["songList", "songComment"].includes(tabName)) {
        sessionStorage.setItem("playlistTab", tabName);
      } else if (["album", "mv", "desc"].includes(tabName)) {
        sessionStorage.setItem("singerDetailTab", tabName);
      } else if (
        ["songs", "albums", "playlists", "artists", "videos"].includes(tabName)
      ) {
        sessionStorage.setItem("searchDetailTab", tabName);
      }
    };

    // 给 pane 提供当前标签页以及存储方法
    provide<RootTabs>("rootTabs", { currentName });
    provide<UpdatePaneCallback>("updatePaneState", (navItem: NavItem) =>
      paneStateMap.set(navItem.uid, navItem)
    );

    return {
      currentName,
      navItems,
      handleTabClick,
    };
  },

  render() {
    const instance: any = this;
    const {
      currentName,
      labelSize,
      isAbsolute,
      isScale,
      navItems,
      handleTabClick,
    } = instance;
    const navs = h("div", { class: "tabs-header" }, [
      h(TabNav, {
        currentName,
        labelSize,
        isAbsolute,
        isScale,
        navItems,
        onTabClick: handleTabClick,
      }),
    ]);
    const panels = h(
      "div",
      { class: "tabs-content" },
      instance.$slots.default()
    );
    return h("div", { class: ["tabs"] }, [navs, panels]);
  },
});
</script>

<style lang="scss"></style>
