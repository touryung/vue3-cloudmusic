import { on } from "@/utils/dom";
import { DirectiveBinding } from "vue";

const nodeListenerList = new Map<
  HTMLElement,
  { callback: (e: MouseEvent) => void }
>();

// @ts-ignore
on(document, "click", (e: MouseEvent) => {
  for (const { callback } of nodeListenerList.values()) {
    callback(e);
  }
});

const createCallbackFn = (el: HTMLElement, binding: DirectiveBinding) => {
  return (e: MouseEvent) => {
    const target = e.target as Node;

    // TODO: JSX 中绑定 arg 问题
    // v-outside:arg="fn" 或 v-outside="{ arg, fn }"
    const excludeDOM = binding.arg
      ? document.getElementById(binding.arg)
      : document.getElementById(binding.value.arg);

    if (el.contains(target) || excludeDOM.contains(target)) return;

    binding.arg ? binding.value() : binding.value.value();
  };
};

// 自定义指令的内容
const clickOutside = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    nodeListenerList.set(el, { callback: createCallbackFn(el, binding) });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    nodeListenerList.set(el, { callback: createCallbackFn(el, binding) });
  },
  unmounted(el: HTMLElement) {
    nodeListenerList.delete(el);
  },
};

export default clickOutside;
