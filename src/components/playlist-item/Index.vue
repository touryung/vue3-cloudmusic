<template>
  <div class="playlist-item" @click="handleShowDetails">
    <div class="item-top">
      <img :src="playlistItem.picUrl" />
      <div class="top-count">
        <i class="iconfont icon-playlist-play" />
        <span>{{ playlistItem.playCount }}</span>
      </div>
      <div class="top-author" v-if="playlistItem.nickName">
        <i class="iconfont icon-user" />
        <span>{{ playlistItem.nickName }}</span>
      </div>
    </div>
    <p class="item-bottom">{{ playlistItem.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    playlistItem: {
      type: Object as PropType<PlayListItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();

    const handleShowDetails = () =>
      router.push(`/playlist/${(props.playlistItem as PlayListItem).id}`);

    return {
      handleShowDetails,
    };
  },
});
</script>

<style lang="scss" scoped>
.playlist-item {
  flex: 0 0 18.5%;
  margin-bottom: 20px;
  cursor: pointer;

  .item-top {
    position: relative;

    > img {
      width: 100%;
    }

    .top-count {
      position: absolute;
      top: 4px;
      right: 8px;
      color: #fff;
    }

    .top-author {
      position: absolute;
      bottom: 8px;
      left: 8px;
      color: #fff;
    }
  }

  .item-bottom {
    height: 48px;
    line-height: 1.5;
    @include multipleNoWrap(2);
  }
}
</style>
