import { ComponentInternalInstance, ComputedRef, Ref } from "vue";

export interface NavItemProps {
  label: string;
  name: string;
}

export interface NavItem {
  uid: number;
  props: NavItemProps;
  instance: ComponentInternalInstance;
  // 实例属性的约束
  navName: ComputedRef<string>;
  isActive: ComputedRef<boolean>;
}

export interface TabsProps {
  // 选中的选项卡名称
  activeName: string;
  // 双向绑定值
  modelValue: string;
  // 字体大小
  labelSize: number;
  // 导航是否绝对定位
  isAbsolute: boolean;
  // 导航是否选中变大
  isScale: boolean;
}

export interface RootTabs {
  currentName: Ref<string>;
}
export type UpdatePaneCallback = (navItem: NavItem) => void;
