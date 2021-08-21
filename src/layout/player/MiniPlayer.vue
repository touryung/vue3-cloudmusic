<template>
  <div class="mini-player">
    <div class="player-left">
      <div
        class="music-img"
        title="展开音乐详情页"
        @click="handleChangePlayerStatus"
      >
        <img :src="currentSong.picUrl" alt="" />
        <i class="iconfont icon-blow" />
      </div>
      <div class="music-info">
        <div class="music-name">{{ currentSong.name }}</div>
        <div class="music-singer">
          <span v-for="(artist, index) in currentSong.artists" :key="artist.id">
            {{
              `${artist.name}${
                index === currentSong.artists.length - 1 ? "" : " / "
              }`
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="player-middle">
      <!-- 播放操作 -->
      <div class="middle-buttons">
        <div class="button-mode">
          <transition name="fade">
            <div class="mode-toast" v-show="isShowToast">{{ modeText }}</div>
          </transition>
          <i
            class="play-mode"
            :class="`iconfont icon-${modeIconClass}`"
            :title="modeText"
            @click="handleChangeMode"
          />
        </div>
        <i class="iconfont icon-pre" @click="$emit('change-song-step', 0)" />
        <div class="play-wrapper" @click="handleTogglePlaying">
          <i :class="`iconfont icon-${isPlaying ? 'pause' : 'play'}`" />
        </div>
        <i class="iconfont icon-next" @click="$emit('change-song-step', 1)" />
        <span
          class="icon-word"
          @click="isShowLyric = !isShowLyric"
          :class="{ active: isShowLyric }"
        >
          词
        </span>
      </div>
      <!-- 进度条 -->
      <div class="middle-progress">
        <div class="progress-time">{{ startTimeStr }}</div>
        <Progress
          :percent="percent"
          :percent-change="handleSongPercentChange"
          scale
        />
        <div class="progress-time">{{ endTimeStr }}</div>
      </div>
    </div>
    <div class="player-right">
      <i v-if="!volume" class="iconfont icon-mute" @click="handleToggleMute" />
      <i v-else class="iconfont icon-volume" @click="handleToggleMute" />
      <Progress
        :percent="volume"
        :percent-change="handleVolumePercentChange"
        class="right-progress"
      />
    </div>
  </div>
  <OutlineLyric v-if="isShowLyric" @close="handleLyricClose" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { playerStore } from "@/store/modules/player";
import { debounce, formatDuration } from "@/utils/utils";
import Progress from "@/components/progress/Index.vue";
import OutlineLyric from "@/components/outline-lyric/Index.vue";

export default defineComponent({
  components: { Progress, OutlineLyric },
  props: {
    startTime: {
      type: Number as PropType<number>,
      default: 0,
    },
    endTime: {
      type: Number as PropType<number>,
      default: 0,
    },
    percent: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  emits: ["change-percent", "change-song-step", "change-player-status"],
  setup(props, { emit }) {
    const currentSong = computed<Song>(() => playerStore.currentSong);
    let toastTimer = null;

    // 切换模式按钮
    const isShowToast = ref<boolean>(false);
    const modeText = computed<string>(
      () => ["单曲循环", "顺序播放", "列表循环", "随机播放"][playerStore.mode]
    );
    const modeIconClass = computed<string>(
      () => ["circle-one", "order", "circle", "random"][playerStore.mode]
    );
    const handleChangeMode = debounce(() => {
      playerStore.changeMode();
      isShowToast.value = true;

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => (isShowToast.value = false), 1000);
    }, 500);

    // 暂停（播放）按钮
    const isPlaying = computed<boolean>(() => playerStore.isPlaying);
    const handleTogglePlaying = () =>
      playerStore.changePlayStatus(!isPlaying.value);

    // 静音按钮
    const volume = computed<number>(() => playerStore.volume);
    const preVolume = ref<number>(0); // 记录静音前的声音
    const handleToggleMute = () => {
      if (volume.value) {
        preVolume.value = volume.value;
        playerStore.changeVolume(0);
      } else {
        playerStore.changeVolume(preVolume.value);
      }
    };

    const startTimeStr = computed<string>(() =>
      formatDuration(props.startTime as number)
    );
    const endTimeStr = computed<string>(() =>
      formatDuration(props.endTime as number)
    );

    // 进度条事件
    const handleSongPercentChange = (percent: number) =>
      emit("change-percent", percent);
    const handleVolumePercentChange = (percent: number) =>
      playerStore.changeVolume(percent);

    const isShowLyric = ref<boolean>(true);
    const handleLyricClose = () => (isShowLyric.value = false);

    const handleChangePlayerStatus = () => emit("change-player-status");

    return {
      currentSong,
      isShowToast,
      modeText,
      modeIconClass,
      isPlaying,
      volume,
      startTimeStr,
      endTimeStr,
      isShowLyric,
      handleChangeMode,
      handleTogglePlaying,
      handleToggleMute,
      handleSongPercentChange,
      handleVolumePercentChange,
      handleLyricClose,
      handleChangePlayerStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
// TODO: 解决进入动画失效问题
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.mini-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: $player-height;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #efefef;
  z-index: 75;
  box-sizing: border-box;

  .player-left {
    flex: 0 0 25%;
    display: flex;
    align-items: center;

    .music-img {
      position: relative;
      flex: 0 0 48px;
      height: 48px;
      cursor: pointer;

      > img {
        width: 100%;
      }

      .icon-blow {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 48px;
        text-align: center;
        color: #fff;
        font-size: 36px;
        background: rgba(7, 17, 27, 0.5);
        border-radius: 4px;
        z-index: 80;
        transform: scale(0);
        transition: transform 0.2 ease-in-out;
      }

      &:hover {
        > img {
          filter: blur(2px);
        }
        .icon-blow {
          transform: scale(1);
        }
      }
    }

    .music-info {
      margin-left: 12px;
      font-size: 13px;
      color: #333;

      .music-name,
      .music-singer {
        @include maxWidthEllipsis(120px);
      }

      .music-name {
        margin-bottom: 10px;
        font-size: 15px;
      }
    }
  }

  .player-middle {
    flex: 1;

    .middle-buttons {
      display: flex;
      align-items: center;
      justify-content: center;

      .button-mode {
        position: relative;
        cursor: pointer;

        .mode-toast {
          position: absolute;
          top: -30px;
          left: -40px;
          width: 100px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          background: #424242;
          border-radius: 28px;
        }

        .play-mode {
          font-size: 25px;
          margin-right: 35px;
        }
      }

      // 前后一首
      > .iconfont {
        font-size: 15px;
        color: #2f2f30;

        &:hover {
          color: #ff4e4e;
        }
      }

      .play-wrapper {
        position: relative;
        width: 36px;
        height: 36px;
        margin: 0 36px;
        background: #ebebed;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background: #ccc;
        }

        .icon-play {
          position: absolute;
          top: 10px;
          left: 12px;
          font-size: 18px;
        }

        .icon-pause {
          position: absolute;
          top: 9px;
          left: 8px;
          font-size: 20px;
        }
      }

      .icon-word {
        margin-left: 36px;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        cursor: pointer;

        &:hover {
          color: #ff4e4e;
        }

        &.active {
          color: #ff4e4e;
        }
      }
    }

    .middle-progress {
      display: flex;
      align-items: center;
      justify-content: center;

      .progress-time {
        font-size: 12px;
        color: #939393;
      }
    }
  }

  .player-right {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 25px;
    }

    .right-progress {
      width: 100px;
    }
  }
}
</style>
