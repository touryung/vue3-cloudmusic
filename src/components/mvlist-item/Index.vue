<template>
  <div class="mv-item" @click="handleShowDetail">
    <div class="item-top">
      <img :src="mvItem.picUrl" alt="" />
      <div class="top-count">
        <i class="iconfont icon-playlist-play" />
        <span>{{ mvItem.playCount }}</span>
      </div>
    </div>
    <div class="item-bottom">
      <p class="bottom-name">{{ mvItem.name }}</p>
      <div class="bottom-author">{{ mvItem.artistName }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    mvItem: {
      type: Object as PropType<Mv>,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();
    const handleShowDetail = () => {
      router.push(`/mv/${(props.mvItem as Mv).id}`);
    };

    return {
      handleShowDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.mv-item {
  width: 100%;
  cursor: pointer;

  .item-top {
    position: relative;
    width: 100%;

    > img {
      width: 100%;
    }

    .top-count {
      position: absolute;
      top: 4px;
      right: 10px;
      color: #fff;
    }
  }

  .item-bottom {
    line-height: 1.5;

    .bottom-name {
      @include multipleNoWrap(1);
    }

    .bottom-author {
      font-size: 12px;
      font-weight: 200;
      color: #666;
    }
  }
}
</style>
