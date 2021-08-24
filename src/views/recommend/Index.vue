<template>
  <div class="recommend" v-loading="isLoading">
    <Banners :banners="banners" v-if="banners.length" />
    <h1 class="sub-title" @click="handleShowMore('/playlist')">
      <span>推荐歌单</span>
      <i class="iconfont icon-right" />
    </h1>
    <div class="recommend-playlist">
      <PlaylistItem
        v-for="item in playlists"
        :key="item.id"
        :playlistItem="item"
      />
    </div>
    <h1 class="sub-title">
      <span>独家放送</span>
      <i class="iconfont icon-right" />
    </h1>
    <div class="recommend-ownersend">
      <OwnersendItem
        v-for="item in ownersendList"
        :key="item.id"
        :ownersendItem="item"
      />
    </div>
    <h1 class="sub-title" @click="handleShowMore('/newMusic')">
      <span>最新音乐</span>
      <i class="iconfont icon-right" />
    </h1>
    <div class="recommend-newmusic">
      <NewMusicItem
        v-for="(item, index) in newMusicList"
        :key="item.id"
        :newMusicItem="item"
        @play="handlePlaySong(index)"
      />
    </div>
    <h1 class="sub-title" @click="handleShowMore('/mvList')">
      <span>推荐MV</span>
      <i class="iconfont icon-right" />
    </h1>
    <div class="recommend-mvlist">
      <div
        class="mvlist-item"
        v-for="item in mvList.slice(0, 3)"
        :key="item.id"
      >
        <MvlistItem :mvItem="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
// 导入数据请求函数
import {
  getBannersData,
  getPlaylistData,
  getOwnersendData,
  getNewmusicData,
  getMvlistData,
} from "@/api/recommend/index";
// 导入组件
import Banners from "@/components/banners/Index.vue";
import PlaylistItem from "@/components/playlist-item/Index.vue";
import OwnersendItem from "./components/OwnersendItem.vue";
import NewMusicItem from "./components/NewMusicItem.vue";
import MvlistItem from "@/components/mvlist-item/Index.vue";

import { playerStore } from "@/store/modules/player";

export default defineComponent({
  components: {
    Banners,
    PlaylistItem,
    OwnersendItem,
    NewMusicItem,
    MvlistItem,
  },
  setup() {
    const router = useRouter();
    const isLoading = ref<boolean>(false);
    const banners = ref<string[]>([]);
    const playlists = ref<PlayListItem[]>([]);
    const ownersendList = ref<OwnerSendItem[]>([]);
    const newMusicList = ref<Song[]>([]);
    const mvList = ref<Mv[]>([]);

    const init = async () => {
      isLoading.value = true;

      try {
        banners.value = await getBannersData();
        playlists.value = await getPlaylistData();
        ownersendList.value = await getOwnersendData();
        newMusicList.value = await getNewmusicData();
        mvList.value = await getMvlistData();
      } catch (e) {
        alert(e);
      }

      isLoading.value = false;
    };

    onMounted(() => init());

    const handleShowMore = (url: string) => router.push(url);

    const handlePlaySong = (index: number) => {
      // 修改播放队列
      playerStore.changeCurrentSongQueue(newMusicList.value);
      // 修改队列中的索引
      playerStore.changeCurrentIndex(index);
    };

    return {
      isLoading,
      banners,
      playlists,
      ownersendList,
      newMusicList,
      mvList,
      handleShowMore,
      handlePlaySong,
    };
  },
});
</script>

<style lang="scss" scoped>
.sub-title {
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  .iconfont {
    font-weight: initial;
  }
}
.recommend-playlist,
.recommend-ownersend,
.recommend-newmusic,
.recommend-mvlist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.recommend-mvlist {
  .mvlist-item {
    flex: 0 0 32%;
  }
}
</style>
