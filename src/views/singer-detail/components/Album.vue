<template>
  <div class="album">
    <div class="album-cover">
      <img v-if="album.isTop" src="@/assets/images/top.png" alt="" />
      <template v-else>
        <img :src="album.picUrl" alt="" />
        <div class="album-mask" />
        <div class="album-publish-time">{{ album.publishTime }}</div>
      </template>
    </div>
    <div class="album-songs">
      <h1 class="songs-header">
        <span>{{ album.name }}</span>
        <div class="header-options">
          <i class="iconfont icon-play-double" />
          <div class="divider" />
          <i class="iconfont icon-player-collect" />
        </div>
      </h1>
      <!-- 第一个并且不显示全部才截取前 10 个 -->
      <SongList
        :songs="
          album.isTop && !isShowAll ? album.songs.slice(0, 10) : album.songs
        "
        :showTitle="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import SongList from "@/components/song-list/Index.vue";

export default defineComponent({
  props: {
    album: {
      type: Object as PropType<Album>,
      default: () => ({}),
    },
  },
  components: {
    SongList,
  },
  setup() {
    const isShowAll = ref<boolean>(false);
    return { isShowAll };
  },
});
</script>

<style lang="scss" scoped>
.album {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px;

  .album-cover {
    position: relative;
    flex: 0 0 auto;
    width: 152px;
    cursor: pointer;

    > img {
      width: 100%;
    }

    .album-mask {
      position: absolute;
      top: -12px;
      right: -26px;
      width: 178px;
      height: 178px;
      background: url(../../../assets/images/album.png) no-repeat;
      background-position: 12px;
      background-size: contain;
      z-index: -1;
    }

    .album-publish-time {
      font-size: 12px;
      line-height: 1.5;
      color: #666;
    }
  }

  .album-songs {
    flex: 1;
    margin-left: 80px;

    .songs-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-weight: bold;

      .header-options {
        display: flex;
        align-items: center;
        margin-left: 30px;
        font-weight: initial;

        .iconfont {
          font-size: 24px;
          color: #666;
          cursor: pointer;
        }

        .divider {
          width: 1px;
          height: 12px;
          margin: 0 10px;
          background: #ddd;
        }
      }
    }
  }
}
</style>
