import { DirectiveBinding } from "vue";
import Loading from "./createLoading";

const vLoading = {
  mounted(el: any, binding: DirectiveBinding) {
    const instance = Loading({ visible: binding.value });
    el.instance = instance;
  },

  updated(el: any, binding: DirectiveBinding) {
    const instance = el.instance;

    if (binding.value !== binding.oldValue) {
      instance.visible.value = binding.value;
    }
  },
};

export default vLoading;
