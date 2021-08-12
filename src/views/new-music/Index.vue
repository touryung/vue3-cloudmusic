<template>
  <div class="new-music" v-loading="isLoading">
    <header class="new-music-header">
      <span class="header-item active">新歌速递</span>
      <span class="header-item">新碟上架</span>
    </header>
    <main class="new-music-main">
      <div class="main-top">
        <ul class="top-left">
          <li
            class="left-item"
            :class="{ active: item.value === currentCategory }"
            v-for="item in newMusicCategories"
            :key="item.value"
            @click="handleChangeCategory(item.value)"
          >
            {{ item.label }}
          </li>
        </ul>
        <div class="top-right">
          <div class="right-item highlight">
            <i class="iconfont icon-play-double" />
            <span>播放全部</span>
          </div>
          <div class="right-item">
            <i class="iconfont icon-collect" />
            <span>收藏全部</span>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <NewSongList :topSongs="topSongs" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { NEW_CATEGORYS } from "@/utils/constant";
import { getTopSongsData } from "@/api/new-music/index";

import NewSongList from "./components/NewSongList.vue";

export default defineComponent({
  components: {
    NewSongList,
  },
  setup() {
    const isLoading = ref<boolean>(false);
    const newMusicCategories = ref<any[]>(NEW_CATEGORYS);
    const currentCategory = ref<number>(0);
    const topSongs = ref<Song[]>([]);

    const handleChangeCategory = (newCat: number) => {
      currentCategory.value = newCat;
      getNewSongs();
    };

    const getNewSongs = async () => {
      isLoading.value = true;
      topSongs.value = await getTopSongsData(currentCategory.value);
      isLoading.value = false;
    };

    onMounted(() => getNewSongs());

    return {
      isLoading,
      newMusicCategories,
      currentCategory,
      topSongs,
      handleChangeCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
.new-music {
  .new-music-header {
    display: flex;
    justify-content: center;
    width: 232px;
    margin: 0 auto;
    border: 1px solid #bbb;
    border-radius: 20px;

    .header-item {
      padding: 8px 32px;
      font-size: 13px;
      font-weight: 300;
      cursor: pointer;
      border-radius: 20px;

      &.active {
        background: #bbb;
        color: #fff;
        font-weight: normal;
      }
    }
  }

  .new-music-main {
    margin: 20px 0;

    .main-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;

      .top-left {
        display: flex;
        align-items: center;
        color: #666;

        .left-item {
          margin-right: 20px;
          cursor: pointer;

          &:hover {
            color: #333;
          }

          &.active {
            font-weight: bold;
            color: #333;
          }
        }
      }

      .top-right {
        display: flex;
        align-items: center;

        .right-item {
          display: flex;
          align-items: center;
          padding: 3px 10px;
          margin-left: 10px;
          font-size: 13px;
          border: 1px solid #ccc;
          border-radius: 20px;
          cursor: pointer;

          .iconfont {
            margin-right: 4px;
            font-size: 18px;
            color: #333;
          }

          &.highlight {
            background: $active-color;
            color: #fff;
            border: none;

            .iconfont {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
