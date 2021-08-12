<template>
  <div class="home">
    <Header />
    <Sidebar />
    <main
      class="main"
      :class="{ cover: isTabCover }"
      :style="{ bottom: playerIsShow ? '70px' : '0' }"
    >
      <Tabs
        v-if="!isTabCover"
        :tabList="tabList"
        :currentItem="currentItem"
        @tab-change="handleTabChange"
      />
      <div class="main-page" ref="mainPage" id="mainPage">
        <router-view @pagin-change="handlePaginChange" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "@/layout/header/Header.vue";
import Sidebar from "@/layout/sidebar/Sidebar.vue";
import Tabs from "@/components/header-tabs/Index.vue";

import { scrollTop } from "@/utils/animation";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    Sidebar,
    Tabs,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const playerIsShow = ref<boolean>(false);
    const tabList = [
      { content: "个性推荐", path: "/recommend" },
      { content: "歌单", path: "/playlist" },
      { content: "排行榜", path: "/rank" },
      { content: "歌手", path: "/singer" },
      { content: "最新音乐", path: "/newMusic" },
    ];
    const mainPage = ref<HTMLDivElement | null>(null);

    const currentItem = computed(() => `/${route.name as string}`);
    const isTabCover = computed(() => route.meta.isTabCover);

    const handleTabChange = (path: string) => router.push(path);
    // 换页回到顶部，此处可结合动画回滚
    const handlePaginChange = () => scrollTop(mainPage);

    return {
      tabList,
      playerIsShow,
      currentItem,
      isTabCover,
      mainPage,
      handleTabChange,
      handlePaginChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: $header-height;
  left: $sidebar-width;
  bottom: $player-height;
  right: 0;
  z-index: -1;
  box-sizing: border-box;
  padding-left: 40px;
  min-width: $min-width - $sidebar-width;

  .main-page {
    height: 100%;
    padding-top: $tab-height;
    padding-right: 40px;
    box-sizing: border-box;
    overflow-y: scroll;
  }

  &.cover {
    padding-left: 0;

    .main-page {
      padding-top: 0;
      padding-right: 0;
    }
  }
}
</style>
