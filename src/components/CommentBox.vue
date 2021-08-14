<template>
  <div class="comment-box">
    <textarea
      class="box-input"
      rows="4"
      maxlength="140"
      @keyup="handleCalcRestWord"
      ref="commentInput"
    />
    <span class="input-rest">{{ inputRestWord }}</span>
    <div class="box-options">
      <div class="options-left">
        <i class="iconfont icon-emotional" />
        <i class="iconfont icon-at" />
        <i class="iconfont icon-well" />
      </div>
      <div class="options-right">评论</div>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce } from "@/utils/utils";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 处理剩余字数
    const inputRestWord = ref(140);
    const commentInput = ref<HTMLTextAreaElement | null>(null);
    const calcWord = () => {
      const text = commentInput.value.value;
      const english = text.match(/[a-zA-Z]/g)?.length || 0;
      const chinese = text.length - english;
      inputRestWord.value = Math.floor(140 - english / 2 - chinese);
    };
    const handleCalcRestWord = debounce(calcWord, 300);

    return {
      inputRestWord,
      commentInput,
      handleCalcRestWord,
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-box {
  position: relative;
  .box-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    box-sizing: border-box;
    outline: none;
    color: #333;
    resize: none;
  }

  .input-rest {
    position: absolute;
    top: 5em;
    right: 0.6em;
    font-size: 12px;
    color: #666;
  }

  .box-options {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .options-left {
      .iconfont {
        margin-right: 6px;
        font-size: 24px;
        color: #444;
        cursor: pointer;
      }
    }

    .options-right {
      padding: 8px 16px;
      color: #666;
      border: 1px solid #e1e1e1;
      border-radius: 25px;
      font-size: 14px;
    }
  }
}
</style>
