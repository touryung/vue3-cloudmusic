<template>
  <div
    class="music-item"
    v-for="(song, index) in topSongs"
    :key="song.id"
    @dblclick="handlePlaySong(index)"
  >
    <span class="music-index">{{ (index + 1 + "").padStart(2, "0") }}</span>
    <div class="music-img">
      <img :src="song.picUrl" alt="" />
      <div class="img-decorate">
        <i className="iconfont icon-play" />
      </div>
    </div>
    <div class="music-name">
      <div>
        {{ song.name }}
        <span v-if="song.alias" style="color: #999">
          &nbsp;({{ song.alias }})
        </span>
      </div>
      <i class="iconfont icon-sq" v-if="song.sq" />
      <i
        class="iconfont icon-mv"
        v-if="song.mvId"
        @click="handleShowMvDetail(song.mvId)"
      />
    </div>
    <div class="music-singer">
      <span v-for="(artist, index) in song.artists" :key="artist.id">
        {{ `${artist.name}${index === song.artists.length - 1 ? "" : " / "}` }}
      </span>
    </div>
    <div class="music-album">{{ song.album.name }}</div>
    <div class="music-duration">{{ song.durationStr }}</div>
  </div>
</template>

<script lang="ts">
import { playerStore } from "@/store/modules/player";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    topSongs: {
      type: Array as PropType<Song[]>,
      default: () => [],
    },
  },
  setup(props) {
    const handlePlaySong = (index: number) => {
      playerStore.changeCurrentSongQueue(props.topSongs as Song[]);
      playerStore.changeCurrentIndex(index);
    };

    const router = useRouter();
    const handleShowMvDetail = (id: number) => {
      playerStore.changePlayStatus(false);
      router.push(`/mv/${id}`);
    };

    return {
      handlePlaySong,
      handleShowMvDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.music-item {
  display: flex;
  align-items: center;
  height: 84px;
  color: #666;
  font-size: 14px;
  padding: 0 10px;
  border-radius: 4px;

  .music-index {
    flex: 0 0 25px;
    margin-right: 15px;
    color: #999;
  }

  .music-img {
    flex: 0 0 64px;
    position: relative;
    margin-right: 10px;

    > img {
      width: 100%;
    }

    .img-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: $primary-color;
      text-align: center;
      background: rgba(253, 253, 253, 0.9);
      border-radius: 50%;
      transform: translate(-50%, -50%);

      .icon-play {
        position: relative;
        left: 2px;
        font-size: 14px;
      }
    }
  }

  .music-name {
    flex: 1;
    display: flex;
    align-items: center;

    > div {
      @include maxWidthEllipsis(300px);
    }

    .iconfont {
      position: relative;
      font-size: 36px;
      top: 1px;
      color: $primary-color;
    }
  }

  .music-singer,
  .music-album {
    width: 220px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    flex: 0 0 auto;
    @include maxWidthEllipsis(320px);
  }

  .music-duration {
    flex: 0 0 50;
    text-align: right;
  }

  &:nth-child(odd) {
    background: #f8f8f8;
  }
}
</style>
