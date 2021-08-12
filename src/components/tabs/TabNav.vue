<script lang="ts">
import { defineComponent, h, PropType } from "vue";
import { NavItem } from "./type";

export default defineComponent({
  name: "tab-nav",
  props: {
    currentName: {
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
    navItems: {
      type: Array as PropType<NavItem[]>,
      default: () => [] as NavItem[],
    },
    onTabClick: {
      type: Function as PropType<
        (e: Event, navItem: NavItem, tabName: string) => void
      >,
    },
  },
  render() {
    const {
      currentName,
      labelSize,
      isAbsolute,
      isScale,
      navItems,
      onTabClick,
    } = this;

    // @ts-ignore
    const tabNavs = navItems.map((item: NavItem) => {
      const tabLabel: string = item.props.label;
      const tabName: string = item.props.name;
      const isActive: boolean = currentName === tabName;
      // 渲染导航项数组
      return h(
        "li",
        {
          class: [
            "tabs-nav-item",
            isActive ? "active" : "",
            isScale ? "scale" : "",
          ],
          style: { fontSize: `${labelSize}px` },
          // @ts-ignore
          onClick: (e: Event) => onTabClick(e, item, tabName),
        },
        [tabLabel]
      );
    });
    return h(
      "ul",
      {
        class: ["tabs-nav", isAbsolute ? "absolute" : ""],
      },
      [tabNavs]
    );
  },
});
</script>

<style lang="scss" scoped></style>
