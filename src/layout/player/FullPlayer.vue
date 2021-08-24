<template>
  <transition
    @css="false"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
  >
    <div class="full-player" v-if="isPlayerFull" ref="playerRef">
      <div class="player-top">
        <div class="cd-container">
          <img
            src="@/assets/images/stylus.png"
            class="cd-stylus"
            :style="{ transform: `rotateZ(${isPlaying ? '20' : '-10'}deg)` }"
          />
          <div class="cd-disc" :class="{ infinite: isPlaying }">
            <img :src="currentSong.picUrl" class="song-img" alt="" />
          </div>
          <div class="cd-options">
            <i class="iconfont icon-player-like" />
            <i class="iconfont icon-player-collect" />
            <i class="iconfont icon-player-download" />
            <i class="iconfont icon-share" />
          </div>
        </div>
        <div class="song-container">
          <h1 class="song-title">
            <span class="song-name">{{ currentSong.name }}</span>
            <span
              v-if="currentSong.mvId"
              class="song-extra"
              @click="handleShowDetail(`/mv/${currentSong.mvId}`, true)"
            >
              MV
            </span>
            <span class="song-extra">极高品质</span>
          </h1>
          <div class="singer-belong">
            <div class="belong-item">
              <span class="item-label">专辑 : </span>
              <span
                class="item-value"
                @click="handleShowDetail(`/album/${currentSong.album.id}`)"
              >
                {{ currentSong.album.name }}
              </span>
            </div>
            <div class="belong-item">
              <span class="item-label">歌手 : </span>
              <span class="item-value">
                <span
                  v-for="(artist, index) in currentSong.artists"
                  :key="artist.id"
                  @click="handleShowDetail(`/singer/${artist.id}`)"
                >
                  {{
                    `${artist.name}${
                      index === currentSong.artists.length - 1 ? "" : " / "
                    }`
                  }}
                </span>
              </span>
            </div>
            <div class="belong-item">
              <span class="item-label">来源 : </span>
              <span class="item-value" @click="handleSourceClick">
                Giao哥的私房曲库
              </span>
            </div>
          </div>
          <InlineLyric />
        </div>
      </div>
      <div class="player-bottom">
        <div class="comment-container">
          <h1 class="comment-title">
            评论<span> (已有{{ songCommentInfo.total }}条评论)</span>
          </h1>
          <div class="post-container">
            <div class="post-item">
              <i class="iconfont icon-pen" />
              <span>发表评论</span>
            </div>
            <div class="post-item">
              <i class="iconfont icon-emotional" />
              <i class="iconfont icon-at" />
            </div>
          </div>
          <Comments
            :hotComments="songCommentInfo.hotComments"
            :comments="songCommentInfo.comments"
            :total="songCommentInfo.total"
          />
          <Pagin
            :totalPageCount="songCommentInfo.pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @pageChange="handlePageChange"
          />
        </div>
        <div class="similar-container">
          <h1 class="similar-title">相似歌曲</h1>
          <div
            class="music-item"
            v-for="(song, index) in simiSongs"
            :key="song.id"
            @click="handlePlaySong(index)"
          >
            <div class="item-left">
              <img :src="song.picUrl" alt="" />
              <div class="img-decorate">
                <i class="iconfont icon-play" />
              </div>
            </div>
            <div class="item-right">
              <div class="music-name">
                {{ song.name }}
                <span v-if="song.alias" class="music-alias">
                  ({{ song.alias }})
                </span>
              </div>
              <div class="music-artist">
                <span v-for="(artist, index) in song.artists" :key="artist.id">
                  {{
                    `${artist.name}${
                      index === song.artists.length - 1 ? "" : " / "
                    }`
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shrink-wrapper" @click="$emit('change-player-status')">
        <i class="iconfont icon-shrink" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { playerStore } from "@/store/modules/player";
import { computed, defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import InlineLyric from "@/components/inline-lyric/Index";
import { scrollTop } from "@/utils/animation";
import usePlayerAnimation from "@/hooks/player/usePlayerAnimation";

export default defineComponent({
  props: {
    isPlayerFull: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  components: {
    InlineLyric,
  },
  setup(props, { emit }) {
    const isPlaying = computed(() => playerStore.isPlaying);
    const currentSong = computed(() => playerStore.currentSong);

    const router = useRouter();
    const handleShowDetail = (url: string, isStopPlayer = false) => {
      if (isStopPlayer) playerStore.changePlayStatus(false);
      emit("change-player-status");
      router.push(url);
    };

    const handleSourceClick = () => alert("Giao哥跑路了，曲库没了");

    const songCommentInfo = computed(() => playerStore.currentSongCommentInfo);
    const playerRef = ref<HTMLElement | null>(null);
    const currentPage = ref<number>(1);
    const handlePageChange = (cur: number) => {
      scrollTop(playerRef, 450);
      currentPage.value = cur;
      playerStore.getSongCommentInfoData(cur);
    };

    const simiSongs = computed(() => playerStore.simiSongs);
    const handlePlaySong = (index: number) => {
      playerStore.changeCurrentSongQueue(simiSongs.value);
      playerStore.changeCurrentIndex(index);
    };

    const { handleEnter, handleAfterEnter, handleLeave, handleAfterLeave } =
      usePlayerAnimation();

    return {
      isPlaying,
      currentSong,
      songCommentInfo,
      currentPage,
      playerRef,
      simiSongs,
      handleShowDetail,
      handleSourceClick,
      handlePageChange,
      handlePlaySong,
      handleEnter,
      handleAfterEnter,
      handleLeave,
      handleAfterLeave,
    };
  },
});
</script>

<style lang="scss" scoped>
.full-player {
  position: fixed;
  top: $header-height;
  bottom: $player-height;
  width: 100%;
  box-sizing: border-box;
  padding: 0 14vw 10px;
  background: linear-gradient(#ddd, #fff);
  overflow-y: auto;
  z-index: 90;

  .player-top {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .cd-container {
      position: relative;
      width: 50%;

      .cd-stylus {
        position: absolute;
        top: -10px;
        left: 48%;
        width: 160px;
        transform-origin: 10px 10px;
        transition: all 0.3s ease-in-out;
        z-index: 91;
      }

      .cd-disc {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360px;
        height: 360px;
        margin: 30px auto 10px auto;
        background: url(../../assets/images/cover.png) no-repeat center;
        background-size: cover;

        &.infinite {
          animation: rotate 16s linear infinite;
        }

        .song-img {
          width: 60%;
          height: 60%;
          border-radius: 50%;
        }
      }

      .cd-options {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 340px;
        margin: auto;

        .iconfont {
          padding: 8px;
          font-size: 26px;
          color: #333;
          background: #f5f5f5;
          border-radius: 50%;
        }
      }
    }

    .song-container {
      width: 50%;
      margin-top: 30px;
      box-sizing: border-box;
      padding: 0 40px;

      .song-title {
        display: flex;
        align-items: flex-end;
        font-size: 24px;

        .song-name {
          @include maxWidthEllipsis(70%);
        }

        .song-extra {
          padding: 1px 2px;
          margin-left: 8px;
          font-size: 12px;
          color: $primary-color;
          border: 1px solid $primary-color;
          border-radius: 2px;
        }
      }

      .singer-belong {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        font-size: 13px;

        .belong-item {
          flex: 0 0 auto;
          @include maxWidthEllipsis(33%);

          .item-label {
            color: #888;
          }
          .item-value {
            color: #5480b1;
            cursor: pointer;
          }
        }
      }
    }
  }

  .player-bottom {
    display: flex;
    align-items: flex-start;
    margin: 40px 0;

    .comment-container {
      flex: 0 0 65%;
      padding: 20px;
      box-sizing: border-box;

      .comment-title {
        font-size: 15px;
        font-weight: bold;

        > span {
          font-size: 12px;
          font-weight: 100;
          color: #999;
        }
      }

      .post-container {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        height: 70px;
        padding: 5px;
        margin: 20px 0 30px;
        font-size: 13px;
        font-weight: 100;
        color: #999;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        cursor: text;

        .post-item {
          .iconfont {
            font-size: 24px;
            margin: 0 5px;
          }
        }
      }
    }

    .similar-container {
      flex: 1;
      padding: 20px;
      margin-left: 10px;

      .similar-title {
        margin-bottom: 20px;
        font-weight: bold;
      }

      .music-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 10px;
        border-radius: 4px;

        &:hover {
          background: #f1f2f3;
        }

        .item-left {
          position: relative;

          > img {
            width: 52px;
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
            background: rgba(253, 253, 253, 0.9);
            border-radius: 50%;

            .icon-play {
              position: relative;
              font-size: 12px;
              left: 2px;
              top: -1px;
            }
          }
        }

        .item-right {
          flex: 1;
          margin-left: 10px;
          font-size: 13px;

          .music-name {
            margin-bottom: 10px;
            @include multipleNoWrap(1);

            .music-alias {
              color: #999;
            }
          }

          .music-artist {
            font-size: 12px;
            color: #666;
            @include multipleNoWrap(2);
          }
        }
      }
    }
  }

  .shrink-wrapper {
    position: absolute;
    top: 20px;
    right: 12vw;
    padding: 5px 10px;
    border: 1px solid #666;
    border-radius: 5px;
    cursor: pointer;

    .icon-shrink {
      font-size: 20px;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
