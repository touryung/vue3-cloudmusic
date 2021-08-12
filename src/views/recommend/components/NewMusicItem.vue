<template>
  <div class="new-music-item" @click="$emit('play')">
    <div class="item-left">
      <img :src="newMusicItem.picUrl" alt="" />
      <div class="img-decorate">
        <i class="iconfont icon-play" />
      </div>
    </div>
    <div class="item-right">
      <div
        class="music-name"
        :title="`${newMusicItem.name}(${newMusicItem.alias})`"
      >
        {{ newMusicItem.name }}
        <span v-if="newMusicItem.alias" class="music-alias">
          ({{ newMusicItem.alias }})
        </span>
      </div>
      <!-- TODO: 解决一行显示问题 -->
      <div class="music-info">
        <span v-if="newMusicItem.sq" class="music-info-extra">SQ</span>
        <span v-if="newMusicItem.mvId !== 0" class="music-info-extra">MV</span>
        <span class="music-info-singers">
          <span
            v-for="(artist, index) in newMusicItem.artists"
            :key="artist.id"
          >
            {{
              `${artist.name}${
                index === newMusicItem.artists.length - 1 ? "" : " / "
              }`
            }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    newMusicItem: {
      type: Object as PropType<Song>,
      default: () => ({}),
    },
  },
  emits: ["play"],
});
</script>

<style lang="scss" scoped>
.new-music-item {
  flex: 0 0 32%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  .item-left {
    position: relative;
    cursor: pointer;

    > img {
      width: 48px;
    }

    .img-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: $primary-color;
      background: rgba(253, 253, 253, 0.9);
      border-radius: 50%;

      .icon-play {
        position: relative;
        left: 2px;
      }
    }
  }

  .item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 48px;
    padding-left: 10px;
    border-radius: 0px 4px 4px 0;

    .music-name,
    .music-info {
      @include multipleNoWrap(1);

      .music-alias {
        color: #999;
      }
    }

    .music-info {
      margin-top: 10px;
      color: #999;

      .music-info-extra {
        display: inline-block;
        padding: 0 1px;
        margin-right: 5px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: $primary-color;
        border: 1px solid $primary-color;
        border-radius: 2px;
        box-sizing: border-box;
      }

      .music-info-singers {
        font-weight: 100;
      }
    }

    &:hover {
      background: #f1f2f3;
    }
  }
}
</style>
