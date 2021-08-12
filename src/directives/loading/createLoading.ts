import { createVNode, h, reactive, render, toRefs, VNode, watch } from "vue";

interface Options {
  visible: boolean;
}

function createLoadingComponent(options: Options) {
  let vm: VNode | null = null;
  const data = reactive({ visible: options.visible || false });

  // 移除 loading
  function destroySelf() {
    if (vm.el.parentNode && vm.el) vm.el.parentNode.removeChild(vm.el);
  }

  const loadingComponent = {
    name: "loading",
    setup() {
      watch(
        () => data.visible,
        (val: boolean) => !val && destroySelf()
      );
      return { ...toRefs(data) };
    },
    render() {
      return h("div", {
        // @ts-ignore
        style: { display: this.visible ? "block" : "none" },
        class: ["loading"],
      });
    },
  };

  // 编译组件模板并渲染
  vm = createVNode(loadingComponent);
  render(vm, document.createElement("div"));

  return {
    ...toRefs(data),
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}

const Loading = (options: Options) => {
  // 挂载新的 loading
  const instance = createLoadingComponent(options);
  document.body.appendChild(instance.$el);
  return instance;
};

export default Loading;
