<template>
  <div class="progress-container">
    <div
      class="progress"
      :class="{ scale }"
      ref="progressRef"
      @click="handleClick"
    >
      <!-- 进度条 -->
      <div class="progress-bar" ref="progressBarRef" />
      <!-- 滑块 -->
      <div
        class="progress-btn"
        ref="progressBtnRef"
        @mousedown="handleMouseDown"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from "vue";

export interface CallBack {
  (percent: number): void;
}

export default defineComponent({
  props: {
    // 传入的百分比
    percent: {
      type: Number as PropType<number>,
      default: 0,
    },
    // 传出的百分比
    percentChange: {
      type: Function as PropType<CallBack>,
      default: () => {},
    },
    // 鼠标移上是否变大
    scale: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const progressRef = ref<HTMLElement | null>(null);
    const progressBarRef = ref<HTMLElement | null>(null);
    const progressBtnRef = ref<HTMLElement | null>(null);

    const moveInfo = reactive({
      isStarted: false, // 是否开始拖动
      startX: 0, // 拖动的初始位置
      left: 0, // 进度条长度
    });
    // TODO: 拖动有问题
    const handleMouseDown = (e: MouseEvent) => {
      moveInfo.isStarted = true;
      moveInfo.startX = e.pageX;
      moveInfo.left = progressBarRef.value.clientWidth;
    };
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!moveInfo.isStarted) return; // 点击立刻松手

      const moveX: number = e.pageX - moveInfo.startX; // 移动的距离
      const progressWidth: number = progressRef.value.clientWidth;
      // 以 0 和 progressWidth 为边界
      const moveWidth = Math.min(
        Math.max(0, moveX + moveInfo.left),
        progressWidth
      );
      updateOffset(moveWidth);
    };
    const handleMouseUp = () => {
      // 解决进度条外点击触发
      if (moveInfo.isStarted) changePercent();
      moveInfo.isStarted = false;
    };

    // 解决拖到进度条外的 bug
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;

    const handleClick = (e: MouseEvent) => {
      const rect: ClientRect = progressRef.value.getBoundingClientRect();
      const moveWidth: number = e.pageX - rect.left;
      updateOffset(moveWidth);
      changePercent();
    };

    const updateOffset = (moveWidth: number) => {
      progressBarRef.value.style.width = `${moveWidth}px`;
      progressBtnRef.value.style.transform = `translateX(${moveWidth}px)`;
    };

    const changePercent = () => {
      const progressWidth = progressRef.value.clientWidth;
      const barWidth = progressBarRef.value.clientWidth;
      const currentPercent = barWidth / progressWidth;
      // @ts-ignore
      props.percentChange(currentPercent);
    };

    // 随着 percent 改变更新位移
    watchEffect(() => {
      const { percent } = toRefs(props);
      if (
        percent.value >= 0 &&
        percent.value <= 1 &&
        !moveInfo.isStarted &&
        progressRef.value
      ) {
        const progressWidth = progressRef.value.clientWidth;
        const moveWidth = progressWidth * Number(percent.value);
        updateOffset(moveWidth);
      }
    });

    return {
      progressRef,
      progressBarRef,
      progressBtnRef,
      handleMouseDown,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.progress-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .progress {
    position: relative;
    width: 500px;
    height: 4px;
    margin: 0 10px;
    border-radius: 4px;
    background: #e6e6e6;

    .progress-bar {
      position: absolute;
      height: 100%;
      border-radius: 4px;
      background: #ff4e4e;
    }

    .progress-btn {
      position: absolute;
      top: -2px;
      left: -2px;
      border-radius: 50%;
      background: #ff4e4e;
      cursor: pointer;
    }

    &:hover {
      .progress-btn {
        width: 8px;
        height: 8px;
      }
    }

    &.scale:hover {
      height: 6px;

      .progress-btn {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>
