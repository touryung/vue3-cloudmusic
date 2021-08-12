import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import {
  getHotCategoryData,
  getAllCategoryData,
  getPlaylistData,
} from "@/api/playlist/index";
import { playlistStore } from "@/store/modules/playlist";

import PlayListItem from "@/components/playlist-item/Index.vue";
import Pagin from "@/components/pagin/Index.vue";
import styles from "./index.module.scss";

export default defineComponent({
  components: {
    PlayListItem,
  },
  setup(props, { emit }) {
    /**
     * 数据区
     */
    const router = useRouter();
    const isLoading = ref<boolean>(false);
    // 是否显示选择框
    const isShowCategoryDialog = ref<boolean>(false);
    const activeCategory = computed<string>(() => playlistStore.activeCategory);
    const currentHighQuality = computed<PlayListItem[]>(
      () => playlistStore.currentHighQuality
    );
    const categories = reactive({
      hotCategory: { tags: [] },
      allCategory: { all: {}, categories: {}, sub: [] },
    });
    const directive = {
      value: () => (isShowCategoryDialog.value = false),
      arg: "playlist-all",
    };
    const currentPlaylist = ref<PlayListItem[]>([]);
    const paginData = { currentPage: 1, totalPageCount: 0 };

    /**
     * 初始化区
     */
    const initPlaylist = async () => {
      isLoading.value = true;
      // 异步获取精品歌单数据
      playlistStore.getHighQualityList(activeCategory.value);
      // 同步获取下方歌单数据
      const { playlists, pageCount } = await getPlaylistData(
        activeCategory.value,
        paginData.currentPage
      );
      currentPlaylist.value = playlists;
      paginData.totalPageCount = pageCount;

      isLoading.value = false;
    };

    // 初始化分类数据
    const initCategory = async () => {
      categories.hotCategory = await getHotCategoryData();
      categories.allCategory = await getAllCategoryData();

      await initPlaylist();
    };

    onMounted(() => initCategory());

    /**
     * 处理函数区
     */
    const handleToggleDialog = () => {
      isShowCategoryDialog.value = !isShowCategoryDialog.value;
    };

    // 切换分类
    const handleChangeCategory = (newCategory = "") => {
      playlistStore.changeActiveCategory(newCategory);
      initPlaylist();
    };

    const handleShowHighQuality = () => router.push("/highQuality");

    const handlePageChange = (currentPage: number) => {
      emit("pagin-change");
      paginData.currentPage = currentPage;
      initPlaylist();
    };

    // 渲染整个分类标签
    const renderCategoryList = () => {
      const category: Array<string> = Object.values(
        categories.allCategory.categories
      );
      const iconArr: Array<string> = [
        "languages",
        "style",
        "scene",
        "emotional",
        "theme-list",
      ];

      return category.map((item: string, i: number) => (
        <li class={styles.categoryItem} key={`category${i}`}>
          <div class={styles.categoryItemLeft}>
            <i class={`iconfont icon-${iconArr[i]}`} />
            <span>{item}</span>
          </div>
          <div class={styles.categoryItemRight}>
            {renderCategoryListItem(i)}
          </div>
        </li>
      ));
    };

    // 渲染某一大类的标签
    const renderCategoryListItem = (key: number) => {
      const subList = categories.allCategory.sub.filter(
        (item) => item.category === key
      );

      return subList.map((item) => (
        <div>
          <span
            class={`${
              item.name === activeCategory.value ? styles.active : ""
            } ${item.hot ? styles.hot : ""}`}
            key={item.name}
            onClick={() => handleChangeCategory(item.name)}
          >
            {item.name}
          </span>
        </div>
      ));
    };

    // 渲染右侧热门标签
    const renderHotCategory = () => {
      return categories.hotCategory.tags.map((item) => (
        <span
          class={`${item.name === activeCategory.value ? styles.active : ""} ${
            styles.hotCategoryTag
          }`}
          key={item.id}
          onClick={() => handleChangeCategory(item.name)}
        >
          {item.name}
        </span>
      ));
    };

    // 渲染下方歌单
    const renderPlayList = () => {
      return currentPlaylist.value.map((playlistItem) => (
        <PlayListItem playlistItem={playlistItem} />
      ));
    };

    return () => (
      <div class={styles.playlist} v-loading={isLoading}>
        {currentHighQuality.value.length ? (
          <header class={styles.highQuality} onClick={handleShowHighQuality}>
            {/* 背景图 */}
            <div
              class={styles.decorator}
              style={{
                background: `url(${currentHighQuality.value[0].picUrl})`,
              }}
            />
            {/* 背景遮罩 */}
            <div class={styles.mask} />
            <div class={styles.desc}>
              <img src={currentHighQuality.value[0].picUrl} alt="" />
              {/* 右侧部分 */}
              <div class={styles.info}>
                <div class={styles.infoTag}>
                  <i class="iconfont icon-choiceness" />
                  <span>精品歌单</span>
                </div>
                <div class={styles.infoName}>
                  {currentHighQuality.value[0].name}
                </div>
                <div class={styles.infoCopyWrite}>
                  {currentHighQuality.value[0].copywriter}
                </div>
              </div>
            </div>
          </header>
        ) : null}
        <main class={styles.main}>
          <div class={styles.mainHeader}>
            <div class={styles.category}>
              {/* 选择框按钮 */}
              <div
                id="playlist-all"
                class={styles.categoryBtn}
                onClick={handleToggleDialog}
              >
                <span>全部歌单</span>
                <i class="iconfont icon-right" />
              </div>
              {/* 模态选择框 */}
              <ul
                class={styles.categoryList}
                style={{
                  display: isShowCategoryDialog.value ? "block" : "none",
                }}
                v-outside={directive}
              >
                <li class={`${styles.categoryItem} ${styles.all}`}>
                  <span
                    class={activeCategory.value ? "" : styles.active}
                    onClick={() => handleChangeCategory()}
                  >
                    全部歌单
                  </span>
                </li>
                {renderCategoryList()}
              </ul>
            </div>
            {/* 右侧热门标签 */}
            <div class={styles.hotCategory}>{renderHotCategory()}</div>
          </div>
          {/* 歌单展示部分 */}
          <div class={styles.mainContent}>{renderPlayList()}</div>
          {/* 分页器部分 */}
          <Pagin
            totalPageCount={paginData.totalPageCount}
            pagerCount={9}
            currentPage={paginData.currentPage}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    );
  },
});
