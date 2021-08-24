<template>
  <div class="search-detail" v-loading="isLoading">
    <header class="search-header">找到 {{ total }} {{ typeToChinese }}</header>
    <div class="search-content">
      <Tabs v-model="activeName" @tab-click="handleTabChange">
        <TabPane label="单曲" name="songs">
          <SongList :songs="songs" />
          <Pagin
            :totalPageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @page-change="handlePageChange"
            style="margin: 10px 0"
          />
        </TabPane>
        <TabPane label="歌手" name="artists">
          <div
            class="artist"
            v-for="artist in artists"
            :key="artist.id"
            @click="handleShowDetail(`/singer/${artist.id}`)"
          >
            <div class="artist-info">
              <img :src="artist.picUrl" alt="" />
              <span>{{ artist.name }}</span>
            </div>
            <i class="iconfont icon-user" />
          </div>
          <Pagin
            :totalPageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @page-change="handlePageChange"
            style="margin: 10px 0"
          />
        </TabPane>
        <TabPane label="专辑" name="albums">
          <div
            class="album"
            v-for="album in albums"
            :key="album.id"
            @click="handleShowDetail(`/album/${album.id}`)"
          >
            <img :src="album.picUrl" alt="" />
            <span class="album-name">{{ album.name }}</span>
            <span class="album-artist">
              {{ album.artist }}
              <span v-if="album.artistAlias" class="artist-alias">
                ({{ album.artistAlias }})
              </span>
            </span>
          </div>
        </TabPane>
        <TabPane label="视频" name="videos">
          <div class="videos">
            <div
              class="video"
              v-for="video in videos"
              :key="video.id"
              @click="handleShowDetail(`/mv/${video.id}`, true)"
            >
              <div class="video-cover">
                <img :src="video.coverUrl" alt="" />
                <div class="cover-count">
                  <i class="iconfont icon-playlist-play" />
                  <span>{{ video.playCount }}</span>
                </div>
                <div class="cover-duration">{{ video.durationStr }}</div>
              </div>
              <div class="video-desc">
                <p class="desc-name">{{ video.name }}</p>
                <div class="desc-creator">by {{ video.nickName }}</div>
              </div>
            </div>
          </div>
          <Pagin
            :totalPageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @page-change="handlePageChange"
            style="margin: 10px 0"
          />
        </TabPane>
        <TabPane label="歌单" name="playlists">
          <div
            class="playlist"
            v-for="playlist in playlists"
            :key="playlist.id"
            @click="handleShowDetail(`/playlist/${playlist.id}`)"
          >
            <img :src="playlist.coverImgUrl" alt="" />
            <span class="playlist-name">{{ playlist.name }}</span>
            <span class="playlist-count">{{ playlist.trackCount }}首</span>
            <span class="playlist-artist">
              <span style="color: #aaa">by </span>{{ playlist.nickName }}
            </span>
          </div>
          <Pagin
            :totalPageCount="pageCount"
            :pagerCount="9"
            :currentPage="currentPage"
            @page-change="handlePageChange"
            style="margin: 10px 0"
          />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { getSearchInfoData } from "@/api/search";
import { SEARCH_TYPE } from "@/utils/constant";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
  useRouter,
} from "vue-router";

import SongList from "@/components/song-list/Index.vue";
import { playerStore } from "@/store/modules/player";

export default defineComponent({
  components: {
    SongList,
  },
  emits: ["pagin-change"],
  setup(props, { emit }) {
    const isLoading = ref<boolean>(false);
    const activeName = ref<string>(
      sessionStorage.getItem("searchDetailTab") || "songs"
    );
    const typeToChinese = computed(() => SEARCH_TYPE[activeName.value].resName);
    const route = useRoute();
    const router = useRouter();
    const keywords = String(route.params.keywords);

    const pageInfo = reactive({
      currentPage: 1,
      pageCount: 0,
      total: 0,
    });
    const handleTabChange = () => {
      pageInfo.currentPage = 1;
      init(keywords);
    };
    const handlePageChange = (currentPage: number) => {
      pageInfo.currentPage = currentPage;
      emit("pagin-change");
      init(keywords);
    };

    const searchInfo = reactive({
      songs: [],
      albums: [],
      artists: [],
      videos: [],
      playlists: [],
    });
    const init = async (keywords: string) => {
      isLoading.value = true;

      const info = await getSearchInfoData(
        keywords,
        activeName.value,
        pageInfo.currentPage
      );

      searchInfo[activeName.value] = info[activeName.value];
      pageInfo.pageCount = info.pageCount;
      pageInfo.total = info.total;

      isLoading.value = false;
    };
    onMounted(() => init(keywords));
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      activeName.value = "songs";
      pageInfo.currentPage = 1;
      init(String(to.params.keywords));
    });

    const handleShowDetail = (url: string, isStopPlayer?: boolean) => {
      if (isStopPlayer) playerStore.changePlayStatus(false);
      router.push(url);
    };

    return {
      isLoading,
      activeName,
      typeToChinese,
      ...toRefs(searchInfo),
      ...toRefs(pageInfo),
      handleTabChange,
      handlePageChange,
      handleShowDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.tabs-header) {
  .tabs-nav {
    height: 40px;
    margin-bottom: 15px;
  }
}

.search-detail {
  padding: 2% $tab-padding-horizon;

  .search-header {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 1.5%;
  }

  .search-content {
    .artist,
    .album,
    .playlist {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 15px 20px;
      border-radius: 5px;

      &:nth-child(even) {
        background: #f8f8f8;
      }

      &:hover {
        background: #f1f1f1;
      }
    }
    .artist {
      justify-content: space-between;

      .artist-info {
        display: flex;
        align-items: center;

        > img {
          width: 64px;
          margin-right: 10px;
        }
      }

      .icon-user {
        padding: 2px;
        font-size: 14px;
        color: #fff;
        background: $active-color;
        border-radius: 50%;
        &::before {
          position: relative;
          left: -0.5px;
        }
      }
    }

    .album {
      > img {
        width: 64px;
        margin-right: 10px;
      }

      .album-name {
        flex: 0 0 450px;
      }

      .album-artist {
        flex: 1;
        font-size: 12px;
        color: #666;

        .artist-alias {
          color: #bbb;
        }
      }
    }

    .videos {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .video {
        flex: 0 0 23.5%;
        margin-right: 2%;
        margin-bottom: 20px;
        font-size: 12px;
        cursor: pointer;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .video-cover {
          position: relative;
          width: 100%;
          margin-bottom: 5px;

          > img {
            width: 100%;
          }

          .cover-count {
            position: absolute;
            top: 4px;
            right: 8px;
            color: #fff;
          }

          .cover-duration {
            position: absolute;
            bottom: 6px;
            right: 8px;
            color: #fff;
          }
        }

        .video-desc {
          .desc-name,
          .desc-creator {
            line-height: 1.5;
            @include multipleNoWrap(1);
          }

          .desc-creator {
            color: #ddd;
          }
        }
      }
    }

    .playlist {
      > img {
        width: 64px;
        margin-right: 10px;
      }

      .playlist-name {
        flex: 0 0 400px;
      }

      .playlist-count {
        flex: 0 0 200px;
        font-size: 12px;
        color: #666;
      }

      .playlist-artist {
        flex: 1;
        font-size: 12px;
        color: #444;
      }
    }
  }
}
</style>
