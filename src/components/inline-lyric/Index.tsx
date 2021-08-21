import { Lyric, playerStore } from "@/store/modules/player";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import "./Index.scss";

export default defineComponent({
  setup() {
    const lyrics = computed<Lyric[]>(() => playerStore.lyrics);
    const lyricsRef = ref<HTMLElement | null>(null);

    const setScrollTop = () => {
      const lyricDOMList = lyricsRef.value.querySelectorAll("li");
      // 当前歌词一出现，立即更改行号为下一行，因此当前行 = 行号 - 1
      const lineNumber = computed<number>(
        () => playerStore.currentLineNumber - 1
      );

      if (lineNumber.value < 0) return;
      lyricDOMList[lineNumber.value].className = "active";

      const BASELINE = 2; // 开始滚动行号
      // 设置固定行高，只兼容一行歌词
      const lineHeight = 40;
      lyricsRef.value.scrollTop = Number(
        (lineNumber.value - BASELINE) * lineHeight
      );
    };

    onMounted(() => setScrollTop());

    watch(
      () => playerStore.currentLineNumber,
      (newVal: number) => {
        if (!lyricsRef.value) return;

        const lyricDOMList = lyricsRef.value.querySelectorAll("li");
        for (const lyricDOM of lyricDOMList) {
          lyricDOM.removeAttribute("class");
        }

        if (newVal === 0) lyricsRef.value.scrollTop = 0;
        setScrollTop();
      }
    );

    const renderLyrics = () => {
      return lyrics.value.map((lyric, i) => (
        <li key={`lyric-${i}`}>{lyric.text}</li>
      ));
    };

    return () => (
      <ul ref={lyricsRef} class="lyrics">
        {renderLyrics()}
      </ul>
    );
  },
});
