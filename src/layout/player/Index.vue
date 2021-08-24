<template>
  <div class="player-container">
    <MiniPlayer
      v-if="isShowMiniPlayer"
      :startTime="startTime"
      :endTime="endTime"
      :percent="percent"
      @change-percent="handleChangePercent"
      @change-song-step="handleListLoop"
      @change-player-status="handleChangePlayerStatus"
    />
    <FullPlayer
      :isPlayerFull="isPlayerFull"
      @change-player-status="handleChangePlayerStatus"
    />
    <audio
      ref="audioRef"
      @timeupdate="handleUpdateTime"
      @ended="handleChangeSong"
      @error="handleChangeSong"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import MiniPlayer from "./MiniPlayer.vue";
import FullPlayer from "./FullPlayer.vue";
import { playerStore } from "@/store/modules/player";
import { MODE } from "@/utils/constant";

export default defineComponent({
  components: { MiniPlayer, FullPlayer },
  setup() {
    // 根据当前是否有播放队列判断是否展示底部播放器
    const isShowMiniPlayer = computed(
      () => playerStore.currentSongQueue.length > 0
    );

    const duration = reactive({ startTime: 0, endTime: 0, percent: 0 });

    watch(
      [() => playerStore.currentSongQueue, () => playerStore.currentIndex],
      () => {
        const { currentSongQueue, currentIndex } = playerStore;
        // 队列和索引都是初始值或者索引越界 -> 直接返回
        if (
          !currentSongQueue.length ||
          currentIndex === -1 ||
          !currentSongQueue[currentIndex]
        ) {
          return;
        }

        try {
          duration.startTime = 0;
          duration.endTime = currentSongQueue[currentIndex].duration;
          audioRef.value.src = `https://music.163.com/song/media/outer/url?id=${currentSongQueue[currentIndex].id}.mp3`;
          audioRef.value.play();
          playerStore.changePlayStatus(true);
          playerStore.changeCurrentSong(currentSongQueue[currentIndex]);

          playerStore.getSongLyricsData();
          playerStore.changeCurrentLineNumber(0);
          playerStore.getSongCommentInfoData();
          playerStore.getSimiSongsData();
        } catch (e) {
          handleListLoop();
        }
      },
      { deep: true } // 对象内部，深度监听
    );
    watch(
      () => playerStore.isPlaying,
      (status) => (status ? audioRef.value.play() : audioRef.value.pause())
    );

    const audioRef = ref<HTMLAudioElement | null>(null);
    const handleUpdateTime = (e: any) => {
      // 更新前面时间和进度条
      duration.startTime = e.target.currentTime * 1000;
      duration.percent = duration.startTime / duration.endTime;

      // 更新歌词
      getCurrentLyric(e.target.currentTime);
    };
    const handleChangePercent = (percent: number) => {
      // 更新音频进度
      const currentTime = (duration.endTime * percent) / 1000;
      audioRef.value.currentTime = currentTime;

      // 更新歌词行号
      const lyrics = playerStore.lyrics;
      const no = lyrics.findIndex((lyric) => lyric.time >= currentTime);
      if (no === -1) {
        playerStore.changeCurrentLineNumber(lyrics.length - 1);
        return;
      }
      playerStore.changeCurrentLineNumber(no);
    };

    // state: 1 -> 下一首，0 -> 上一首
    const handleChangeSong = (e: any, state = 1) => {
      const { mode } = playerStore;
      switch (mode) {
        case MODE.singleCycle:
          handleLoop();
          break;
        case MODE.orderPlay:
          handleOrder();
          break;
        case MODE.listLoop:
          handleListLoop(state);
          break;
        case MODE.randomPlay:
          handleRandom();
          break;
        default:
          handleLoop();
          break;
      }
    };
    const handleLoop = () => {
      playerStore.changeCurrentLineNumber(0);
      audioRef.value.currentTime = 0;
      audioRef.value.play();
    };
    const handleOrder = () => {
      const { currentSongQueue, currentIndex } = playerStore;
      if (currentIndex === currentSongQueue.length - 1) {
        playerStore.changePlayStatus(false);
      } else {
        playerStore.changeCurrentIndex(currentIndex + 1);
      }
    };
    const handleListLoop = (state = 1) => {
      const { currentSongQueue, currentIndex } = playerStore;
      let newIndex: number;
      if (state === 1) {
        newIndex =
          currentIndex === currentSongQueue.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex =
          currentIndex === 0 ? currentSongQueue.length - 1 : currentIndex - 1;
      }
      playerStore.changeCurrentIndex(newIndex);
    };
    const handleRandom = () => {
      const newIndex: number = Math.floor(
        Math.random() * playerStore.currentSongQueue.length
      );
      playerStore.changeCurrentIndex(newIndex);
    };

    const getCurrentLyric = (currentTime: number) => {
      const { lyrics, currentLineNumber } = playerStore;
      if (!lyrics.length || !lyrics[currentLineNumber]) return;

      // 获取当前歌词，并设置下一行行号
      if (lyrics[currentLineNumber].time <= currentTime) {
        playerStore.changeCurrentLyric(lyrics[currentLineNumber].text);
        playerStore.changeCurrentLineNumber(currentLineNumber + 1);
      }
    };

    const isPlayerFull = ref<boolean>(false);
    const handleChangePlayerStatus = () =>
      (isPlayerFull.value = !isPlayerFull.value);

    onMounted(() => {
      watch(
        () => playerStore.volume,
        (volume) => (audioRef.value.volume = volume),
        { immediate: true }
      );
    });

    return {
      isShowMiniPlayer,
      audioRef,
      ...toRefs(duration),
      isPlayerFull,
      handleUpdateTime,
      handleChangePercent,
      handleChangeSong,
      handleListLoop,
      handleChangePlayerStatus,
    };
  },
});
</script>

<style lang="scss" scoped></style>
