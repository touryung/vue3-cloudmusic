<template>
  <div class="ownersend-item">
    <div class="item-top">
      <img :src="ownersendItem.picUrl" alt="" />
      <div class="img-decorate">
        <i class="iconfont icon-play" />
      </div>
    </div>
    <p class="item-bottom">{{ ownersendItem.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    ownersendItem: {
      type: Object as PropType<OwnerSendItem>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.ownersend-item {
  flex: 0 0 32%;
  cursor: pointer;

  .item-top {
    position: relative;
    width: 100%;

    > img {
      width: 100%;
    }

    .img-decorate {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      background: rgba(18, 18, 18, 0.32);
      border: 1px solid #bebebe;
      border-radius: 50%;

      .icon-play {
        position: relative;
        left: 2px;
      }
    }
  }

  .item-bottom {
    height: 48px;
    font-size: 16px;
    line-height: 1.5;
    @include multipleNoWrap(2);
  }
}
</style>
