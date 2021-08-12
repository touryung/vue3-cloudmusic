<template>
  <div class="comments">
    <template v-if="hotComments.length">
      <h1 class="comments-title">精彩评论</h1>
      <div class="comments-list">
        <CommentItem
          v-for="item in hotComments"
          :key="item.commentId"
          :comment="item"
        />
      </div>
    </template>
    <h1 class="comments-title">最新评论({{ total }})</h1>
    <div class="comments-list">
      <CommentItem
        v-for="item in comments"
        :key="item.commentId"
        :comment="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CommentItem from "./CommentItem.vue";

export default defineComponent({
  components: {
    CommentItem,
  },
  props: {
    hotComments: {
      type: Array as PropType<Comment[]>,
      default: () => [],
    },
    comments: {
      type: Array as PropType<Comment[]>,
      default: () => [],
    },
    total: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
});
</script>

<style lang="scss" scoped>
.comments {
  margin: 20px 0;

  .comments-title {
    font-size: 16px;
    font-weight: bold;
  }

  .comments-list {
    margin-bottom: 20px;
  }
}
</style>
