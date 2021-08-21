<template>
  <div class="outline-lyric" ref="lyricRef" @mousedown="handleMouseDown">
    <div class="lyric-options">
      <i class="iconfont icon-lyric-prev" />
      <i class="iconfont icon-lyric-pause" />
      <i class="iconfont icon-lyric-next" />
      <i class="iconfont icon-lyric-setting" />
      <i class="iconfont icon-lyric-close" @click="$emit('close')" />
    </div>
    <div class="lyric-content">
      <p class="content">
        {{ currentLyric }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { playerStore } from "@/store/modules/player";
import { computed, defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "outline-lyric",
  emits: ["close"],
  setup() {
    const lyricRef = ref<HTMLElement | null>(null);
    const currentLyric = computed<string>(() => playerStore.currentLyric);

    const position = reactive({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      isStarted: false,
    });
    const handleMouseDown = (e: MouseEvent) => {
      if (!lyricRef.value) return;

      position.x = e.clientX;
      position.y = e.clientY;
      position.left = lyricRef.value.offsetLeft;
      position.top = lyricRef.value.offsetTop;

      position.isStarted = true;
      lyricRef.value.style.cursor = "move";
    };
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!lyricRef.value || !position.isStarted) return;

      const newX = e.clientX;
      const newY = e.clientY;
      const newLeft = position.left + (newX - position.x);
      const newTop = position.top + (newY - position.y);

      lyricRef.value.style.left = `${newLeft}px`;
      lyricRef.value.style.top = `${newTop}px`;
    };
    const handleMouseUp = () => {
      if (!lyricRef.value) return;

      position.isStarted = false;
      lyricRef.value.style.cursor = "default";
    };

    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;

    return {
      lyricRef,
      currentLyric,
      handleMouseDown,
    };
  },
});
</script>

<style lang="scss" scoped>
.outline-lyric {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: $player-height + 20px;
  width: 48vw;
  height: 8vw;
  border-radius: 4px;
  z-index: 99999;

  &:hover {
    background: hsla(0, 1%, 8%, 0.3);
    border: 1px solid hsla(0, 1%, 10%, 0.6);

    .lyric-options {
      opacity: 1;
    }
  }

  .lyric-options {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 60%;
    height: 30px;
    margin: auto;
    opacity: 0;

    .iconfont {
      font-size: 20px;
      color: #f3f3f3;
    }
  }

  .lyric-content {
    margin-top: 20px;
    font-size: 26px;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #c8ef9c;

    .content {
      @include maxWidthEllipsis(80%);
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
