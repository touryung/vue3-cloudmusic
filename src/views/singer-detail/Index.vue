<template>
  <div class="singer-detail" v-loading="isLoading">
    <div class="detail-top">
      <img :src="singerInfo.picUrl" alt="" />
      <div class="top-content">
        <h1 class="content-title">{{ singerInfo.name }}</h1>
        <div v-if="singerInfo.alias" class="content-alias">
          {{ singerInfo.alias }}
        </div>
        <div class="content-options">
          <div class="options-item">
            <i class="iconfont icon-player-collect" />
            <span>收藏</span>
          </div>
          <div class="options-item">
            <i class="iconfont icon-singer-user" />
            <span>个人主页</span>
          </div>
        </div>
        <div class="content-count">
          <span class="label">单曲数 : </span> {{ singerInfo.musicSize }} &nbsp;
          <span class="label">专辑数 : </span> {{ singerInfo.albumSize }} &nbsp;
          <span class="label">MV数 : </span> {{ singerInfo.mvSize }} &nbsp;
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <Tabs v-model="activeName">
        <TabPane label="专辑" name="album">
          <Album :album="hotSongs" />
          <Album v-for="album in albums" :key="album.id" :album="album" />
        </TabPane>
        <TabPane label="MV" name="mv">
          <div class="mv-container">
            <div class="mv-item" v-for="item in mvs" :key="item.id">
              <MvItem :mvItem="item" />
            </div>
          </div>
        </TabPane>
        <TabPane label="歌手详情" name="desc">
          <div
            v-for="(item, index) in singerDesc"
            :key="`desc-${String(index)}`"
            :style="{ marginBottom: '40px' }"
          >
            <h1 class="desc-title">{{ item.title }}</h1>
            <p
              class="desc-text"
              :class="{ bold: text.includes('-----') }"
              v-for="(text, index) in item.textArr"
              :key="`text-${String(index)}`"
            >
              {{ text }}
            </p>
          </div>
        </TabPane>
        <TabPane label="相似歌手" name="simi">
          <div class="simi-singer">
            <div
              class="singer-item"
              v-for="item in simiSinger"
              :key="item.id"
              @click="handleShowSimi(item.id)"
            >
              <img :src="item.picUrl" alt="" />
              <p>{{ item.name }}</p>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  RouteLocationNormalized,
} from "vue-router";

import {
  getAlbumSongsData,
  getSimiSingerData,
  getSingerAlbumsData,
  getSingerDescData,
  getSingerInfoData,
  getSingerMvsData,
} from "@/api/singer/index";
import Album from "./components/Album.vue";
import MvItem from "@/components/mvlist-item/Index.vue";
import { off, on } from "@/utils/dom";
import { debounce, lazyLoad } from "@/utils/utils";
import { scrollTop } from "@/utils/animation";

interface SingerData {
  singerInfo: {
    picUrl?: string;
    name?: string;
    musicSize?: number;
    albumSize?: number;
    mvSize?: number;
    alias?: string;
  };
  hotSongs: any;
  albums: any;
  mvs: any;
  singerDesc: any;
  simiSinger: any;
}

export default defineComponent({
  components: {
    Album,
    MvItem,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = Number(route.params.id);
    const isLoading = ref<boolean>(false);
    const activeName = ref<string>(
      sessionStorage.getItem("singerDetailTab") || "album"
    );

    const data = reactive<SingerData>({
      singerInfo: {},
      hotSongs: {},
      albums: [],
      mvs: [],
      singerDesc: [],
      simiSinger: [],
    });
    const lazyOptions = reactive({ currentPage: 1, more: false });
    const initAlbums = async (id: number) => {
      // 懒加载获取专辑数据
      const { albums, more } = await getSingerAlbumsData(
        id,
        lazyOptions.currentPage
      );
      for (const album of albums) {
        const songs = await getAlbumSongsData(album.id);
        album.songs = songs;
      }
      data.albums.push(...albums);

      lazyOptions.more = more;
      if (more) lazyOptions.currentPage++;
    };
    const init = async (id: number) => {
      isLoading.value = true;

      const { singerInfo, top50 } = await getSingerInfoData(id);
      data.singerInfo = singerInfo;
      data.hotSongs = { name: "热门五十首", songs: top50, isTop: true };

      initAlbums(id);
      data.mvs = await getSingerMvsData(id);
      data.singerDesc = await getSingerDescData(id);
      data.simiSinger = await getSimiSingerData(id);

      isLoading.value = false;
    };

    onMounted(() => {
      init(id);
      on(
        document.getElementById("mainPage"),
        "scroll",
        debounce(
          () =>
            lazyLoad(
              document.getElementById("mainPage"),
              lazyOptions.more,
              () => initAlbums(id)
            ),
          300
        )
      );
    });
    onUnmounted(() => off(document.getElementById("mainPage"), "scroll"));
    // 解决相似歌手同路由不同 id 跳转不更新问题
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      activeName.value = "album";
      const dom = ref<HTMLElement>(document.getElementById("mainPage"));
      scrollTop(dom, 0);
      init(Number(to.params.id));
    });

    const handleShowSimi = (id: number) => router.push(`/singer/${id}`);
    return {
      isLoading,
      activeName,
      ...toRefs(data),
      handleShowSimi,
    };
  },
});
</script>

<style lang="scss" scoped>
.singer-detail {
  .detail-top {
    display: flex;
    align-items: flex-start;
    padding: 2% $tab-padding-horizon;

    > img {
      flex: 0 0 auto;
      width: 184px;
      height: 184px;
      margin-right: 20px;
      border: 1px solid #ccc;
    }

    .top-content {
      flex: 1;

      .content-title {
        font-size: 23px;
        font-weight: bold;
        margin-top: 5px;
      }

      .content-alias {
        font-size: 13px;
        color: #555;
        margin-top: 16px;
      }

      .content-options {
        display: flex;
        align-items: center;
        margin: 16px 0;
        font-size: 14px;
        color: #444;

        .options-item {
          display: flex;
          align-items: center;
          padding: 4px 14px;
          margin-right: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 25px;
          cursor: pointer;

          .iconfont {
            margin-right: 4px;
            font-size: 22px;
            color: #444;
          }
        }
      }

      .content-count {
        font-size: 13px;
        color: #555;
        line-height: 2;

        .label {
          color: #444;
        }
      }
    }
  }

  .detail-bottom {
    padding: 0 $tab-padding-horizon;

    .mv-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .mv-item {
        flex: 0 0 23.5%;
        margin-right: 2%;
        margin-bottom: 20px;

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .desc-title {
      font-size: 15px;
      font-weight: bold;
      line-height: 3;
    }

    .desc-text {
      font-size: 15px;
      line-height: 2;
      color: #666;
      text-indent: 2em;
      &.bold {
        font-weight: bold;
      }
    }

    .simi-singer {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .singer-item {
        flex: 0 0 18%;
        margin-right: 2.5%;
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 1.5;
        color: #666;
        cursor: pointer;

        &:nth-child(5n) {
          margin-right: 0;
        }

        > img {
          width: 100%;
        }
      }
    }
  }
}
</style>
