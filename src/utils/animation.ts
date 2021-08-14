import { Ref } from "vue";

const cubic = (value: number) => Math.pow(value, 3);

const easeInOutCubic = (value: number) =>
  value <= 0.5 ? 4 * cubic(value) : 1 - 4 * cubic(1 - value);

export const scrollTop = (el: Ref<HTMLElement>, endTop = 0) => {
  if (!el.value) return;

  const startTime = Date.now();
  const startValue = el.value.scrollTop;

  // 定时器
  const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));

  const frameFunc = () => {
    // 动画时长 500ms
    const progress = (Date.now() - startTime) / 500;

    // 还未回到指定位置
    if (progress < 1) {
      el.value.scrollTop =
        (startValue - endTop) * (1 - easeInOutCubic(progress));

      // 递归执行
      rAF(frameFunc);
    } else {
      el.value.scrollTop = endTop;
    }
  };

  rAF(frameFunc);
};
