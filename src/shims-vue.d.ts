// 保证 ts 识别 vue 后缀
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 解决 tsx 引入 css 模块报错
declare module "*.scss" {
  const style: any;
  export default style;
}
