<template>
  <div class="list-item list-header">
    <span class="item-index" />
    <div class="item-options" />
    <div class="item-title">音乐标题</div>
    <span class="item-singer">歌手</span>
    <span class="item-album">专辑</span>
    <span class="item-duration">时长</span>
  </div>
  <ul>
    <li
      class="list-item"
      v-for="(item, index) in songs"
      :key="item.id"
      @click="handlePlaySong(index)"
    >
      <span class="item-index">
        {{ (index + 1).toString().padStart(2, "0") }}
      </span>
      <div class="item-options">
        <i class="iconfont icon-song-like" />
        <i class="iconfont icon-song-download" />
      </div>
      <div class="item-title">
        <div class="title-name">
          <span>{{ item.name }}</span>
          <span v-if="item.alias" class="title-alias">({{ item.alias }})</span>
        </div>
        <i v-if="item.sq" class="iconfont icon-sq" />
        <i v-if="item.mvId" class="iconfont icon-mv" />
      </div>
      <span class="item-singer" v-if="showTitle">
        <span v-for="(artist, index) in item.artists" :key="artist.id">
          {{
            `${artist.name}${index === item.artists.length - 1 ? "" : " / "}`
          }}
        </span>
      </span>
      <span class="item-album">{{ item.album.name }}</span>
      <span class="item-duration">{{ item.durationStr }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    songs: {
      type: Array as PropType<Song[]>,
      default: () => [],
    },
    showTitle: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup() {
    const handlePlaySong = (index: number) => alert(index);

    return {
      handlePlaySong,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 14px;
  color: #888;

  .item-index {
    flex: 0 0 4%;
    text-align: right;
  }

  .item-options {
    flex: 0 0 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1%;

    .iconfont {
      font-size: 24px;
      color: #888;
    }
  }

  .item-title {
    flex: 1;
    display: flex;
    align-items: center;
    color: #333;

    .title-name {
      @include maxWidthEllipsis(280px);

      > span {
        margin-right: 5px;
      }

      .title-alias {
        color: #999;
      }
    }

    .iconfont {
      font-size: 36px;
      color: $primary-color;
      vertical-align: middle;
    }
  }

  .item-singer,
  .item-album {
    padding: 0 10px;
    box-sizing: border-box;
    color: #666;
  }

  .item-singer {
    flex: 0 0 20%;
    @include maxWidthEllipsis(20%);
  }

  .item-album {
    flex: 0 0 25%;
    @include maxWidthEllipsis(25%);
  }

  .item-duration {
    flex: 0 0 10%;
  }

  &:nth-child(odd) {
    background: #f9f9f9;
  }

  &:hover {
    background: #f0f0f0;
  }

  &.list-header {
    background: #fff;

    .item-title,
    .item-singer,
    .item-album {
      color: #888;
    }
  }
}
</style>
