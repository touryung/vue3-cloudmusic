<template>
  <div class="pagin">
    <button type="button" class="prev-btn" @click="handlePrevClick">
      <i class="iconfont icon-preview-left" />
    </button>
    <ul class="pager" @click="handlePagerClick">
      <!-- 第一页 -->
      <li
        v-if="totalPageCount > 0"
        class="page-number"
        :class="{ active: currentPage === 1 }"
      >
        1
      </li>
      <!-- 前省略号 -->
      <li v-if="showPrevMore" class="pager-more" />
      <!-- 中间页码 -->
      <li
        v-for="pager in pagers"
        :key="`pager${pager}`"
        class="page-number"
        :class="{ active: currentPage === pager }"
      >
        {{ pager }}
      </li>
      <!-- 后省略号 -->
      <li v-if="showNextMore" class="pager-more" />
      <!-- 最后一页 -->
      <li
        v-if="totalPageCount > 1"
        class="page-number"
        :class="{ active: currentPage === totalPageCount }"
      >
        {{ totalPageCount }}
      </li>
    </ul>
    <button type="button" class="next-btn" @click="handleNextClick">
      <i class="iconfont icon-preview-right" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from "vue";

export default defineComponent({
  name: "pagin",
  props: {
    // 总页数
    totalPageCount: {
      type: Number as PropType<number>,
      default: 13,
    },
    // 页面按钮数，不包括箭头与 ...
    pagerCount: {
      type: Number as PropType<number>,
      default: 7,
    },
    // 当前页
    currentPage: {
      type: Number as PropType<number>,
      default: 1,
    },
    onPageChange: Function,
    // 禁止跳转
    disabled: Boolean,
  },
  emits: ["page-change"],
  setup(props, { emit }) {
    const showPrevMore = ref<boolean>(false);
    const showNextMore = ref<boolean>(false);

    /**
     * 分页规则
     * 1. 比如共有 9 个按钮，当总页数大于 9 时就需要显示省略号
     * 2. 除去开头结尾两个，中间剩 7 个按钮，以当前页数为中心，前后各 3 个
     * 3. 当前面 3 个按钮的最左边比 1 大时，前面显示省略号，后面同理
     */
    const pagers = computed(() => {
      const totalPageCount = Number(props.totalPageCount);
      const pagerCount = Number(props.pagerCount);
      const currentPage = Number(props.currentPage);
      // 判断显示省略号的依据: 9 -> 4，8 -> 3.5
      const halfPagerCount = (pagerCount - 1) / 2;

      let showNextMore = false;
      let showPrevMore = false;

      // 总页数大于按钮数，显示省略号
      if (totalPageCount > pagerCount) {
        // 当前页数小于总页数减半径，显示后省略号
        if (currentPage < totalPageCount - halfPagerCount) {
          showNextMore = true;
        }
        // 当前页数大于 1 加半径，显示前省略号
        if (currentPage > 1 + halfPagerCount) {
          showPrevMore = true;
        }
      }

      const pagerArray = [];

      if (!showPrevMore) {
        // 不显示前省略号时除去第一个和最后一个按钮，从前开始算
        for (let i = 2; i < pagerCount; i++) {
          pagerArray.push(i);
        }
      } else if (showPrevMore && !showNextMore) {
        // 显示前省略号不显示后省略号时除去第一个和最后一个按钮，从后开始算
        const startPage = totalPageCount - (pagerCount - 2);
        for (let i = startPage; i < totalPageCount; i++) {
          pagerArray.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        // 两个都显示就前后各取一半: 9, 8 -> 3
        const radius = Math.floor((pagerCount - 2) / 2);
        for (let i = currentPage - radius; i <= currentPage + radius; i++) {
          pagerArray.push(i);
        }
      }

      return pagerArray;
    });

    /**
     * 监视页改变更新省略号
     */
    watchEffect(() => {
      const totalPageCount = Number(props.totalPageCount);
      const pagerCount = Number(props.pagerCount);
      const currentPage = Number(props.currentPage);
      const halfPagerCount = (pagerCount - 1) / 2;
      showPrevMore.value = false;
      showNextMore.value = false;
      if (totalPageCount > pagerCount) {
        if (currentPage < totalPageCount - halfPagerCount) {
          showNextMore.value = true;
        }
        if (currentPage > 1 + halfPagerCount) {
          showPrevMore.value = true;
        }
      }
    });

    /**
     * 处理上一页
     */
    const handlePrevClick = () => {
      const currentPage = Number(props.currentPage);
      if (currentPage === 1) return;

      emit("page-change", currentPage - 1);
    };

    /**
     * 处理下一页
     */
    const handleNextClick = () => {
      const currentPage = Number(props.currentPage);
      const totalPageCount = Number(props.totalPageCount);
      if (currentPage === totalPageCount) return;

      emit("page-change", currentPage + 1);
    };

    /**
     * 处理页按钮点击
     */
    const handlePagerClick = (event: Event) => {
      const currentPage = Number(props.currentPage);
      const target = event.target as HTMLElement;
      if (target.tagName === "ul" || props.disabled) return;

      const newPage = Number(target.textContent);
      if (newPage !== currentPage) emit("page-change", newPage);
    };

    return {
      showPrevMore,
      showNextMore,
      pagers,
      handlePrevClick,
      handleNextClick,
      handlePagerClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagin {
  display: flex;
  align-items: center;
  justify-content: center;

  .pager {
    display: flex;
    align-items: center;

    .page-number,
    .pager-more {
      width: 30px;
      height: 30px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
    }

    .page-number {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 5px;
      color: #333;
      font-size: 13px;
      cursor: pointer;

      &.active {
        color: #fff;
        background-color: $active-color;
        font-weight: bold;
      }
    }

    .pager-more {
      position: relative;

      &::after {
        content: "...";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.prev-btn,
.next-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  background: #fff;
  margin: 0 5px;
  color: #333;
  cursor: pointer;
  outline: none;
}
</style>
