<template>
  <div class="comment">
    <div class="comment-avatar">
      <img :src="comment.avatarUrl" alt="" />
    </div>
    <div class="comment-content">
      <!-- 评论人+内容 -->
      <p class="content-top">
        <span class="nickname">{{ comment.name }}:</span>
        {{ comment.content }}
      </p>
      <!-- 第一条回复 -->
      <p v-if="comment.beReplied.length" class="content-top replied">
        <span class="nickname">@{{ comment.beReplied[0].name }}:</span>
        {{ comment.beReplied[0].content }}
      </p>
      <div class="content-bottom">
        <span class="bottom-time">{{ comment.time }}</span>
        <div class="bottom-options">
          <span class="option">
            <i class="iconfont icon-zan" />
            <span>{{ comment.likedCount }}</span>
          </span>
          <span class="option">
            <i class="iconfont icon-share" />
          </span>
          <span class="option">
            <i class="iconfont icon-comment" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    comment: {
      type: Object as PropType<Comment>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  font-size: 13px;
  color: #555;
  border-bottom: 1px solid #f2f2f2;

  .comment-avatar {
    flex: 0 0 36px;
    margin-right: 15px;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .comment-content {
    flex: 1;

    .content-top {
      line-height: 2;

      .nickname {
        color: #5480b1;
      }

      &.replied {
        background: #f2f2f2;
        padding: 3px 8px;
        margin: 5px 0;
        border-radius: 5px;
      }
    }

    .content-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .bottom-time {
        color: #666;
      }

      .bottom-options {
        display: flex;

        .option {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0 10px;
          cursor: pointer;

          .iconfont {
            font-size: 18px;
          }

          &::after {
            content: "";
            position: absolute;
            width: 1px;
            height: 12px;
            top: 50%;
            transform: translateY(-50%);
            right: -12px;
            background: #e2e2e2;
          }

          &:last-child::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
