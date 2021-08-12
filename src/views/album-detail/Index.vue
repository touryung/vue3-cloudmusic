<template>
  <div class="playlist-detail" v-loading="isLoading">
    <div class="detail-top">
      <div class="top-cover">
        <img :src="detailInfo.coverImgUrl" alt="" />
        <div class="album-mask" />
      </div>
      <div class="top-content">
        <h1 class="content-title"><span>专辑</span>{{ detailInfo.name }}</h1>
        <div class="content-options">
          <div class="option-item highlight">
            <i class="iconfont icon-lyric-play" />
            <span>播放全部</span>
            <i class="iconfont icon-plus" />
          </div>
          <div class="option-item">
            <i class="iconfont icon-player-collect" />
            <span>收藏({{ detailInfo.subscribedCount }})</span>
          </div>
          <div class="option-item">
            <i class="iconfont icon-share" />
            <span>分享({{ detailInfo.shareCount }})</span>
          </div>
          <div class="option-item">
            <i class="iconfont icon-player-download" />
            <span>下载全部</span>
          </div>
        </div>
        <div class="content-artist">
          <span class="label">歌手 : </span>
          <span class="value">{{ detailInfo.artistName }}</span>
        </div>
        <div class="content-time">
          <span class="label">时间 : </span>{{ detailInfo.publishTime }}
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <Tabs v-model="activeName">
        <TabPane label="歌曲列表" name="songList">
          <SongList :songs="detailInfo.songs" />
        </TabPane>
        <TabPane :label="`评论(${total || 0})`" name="songComment">
          <div class="bottom-comment">
            <div class="comment-box">
              <textarea
                class="box-input"
                rows="4"
                maxlength="140"
                @keyup="handleCalcRestWord"
                ref="commentInput"
              />
              <span class="input-rest">{{ inputRestWord }}</span>
              <div class="box-options">
                <div class="options-left">
                  <i class="iconfont icon-emotional" />
                  <i class="iconfont icon-at" />
                  <i class="iconfont icon-well" />
                </div>
                <div class="options-right">评论</div>
              </div>
            </div>
            <Comments
              :hotComments="hotComments"
              :comments="comments"
              :total="total"
            />
            <Pagin
              :totalPageCount="pageCount"
              :pagerCount="9"
              :currentPage="currentPage"
              @pageChange="handlePageChange"
            />
          </div>
        </TabPane>
        <TabPane label="专辑详情" name="description">
          <div class="bottom-desc">
            <h1 class="desc-title">专辑介绍</h1>
            <p
              class="desc-item"
              v-for="(item, index) in detailInfo.description"
              :key="`desc${String(index)}`"
            >
              {{ item }}
            </p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

import {
  getAlbumDetailData,
  AlbumDetail,
  getAlbumCommentData,
} from "@/api/album/index";
import { debounce } from "@/utils/utils";
import { useRoute } from "vue-router";

import SongList from "@/components/song-list/Index.vue";

export default defineComponent({
  components: {
    SongList,
  },
  setup(props, { emit }) {
    const route = useRoute();
    const id = Number(route.params.id);
    const isLoading = ref<boolean>(false);
    const showDescMore = ref<boolean>(false);
    const activeName = ref<string>(
      sessionStorage.getItem("playlistTab") || "songList"
    );
    // 所有属性变为可选
    const detailInfo = ref<Partial<AlbumDetail>>({});

    const commentData = reactive({
      hotComments: [],
      comments: [],
      total: 0,
      pageCount: 0,
      currentPage: 1,
    });
    const getComments = async () => {
      const { hotComments, comments, total, pageCount } =
        await getAlbumCommentData(id, commentData.currentPage);
      commentData.hotComments = hotComments;
      commentData.comments = comments;
      commentData.total = total;
      commentData.pageCount = pageCount;
    };

    const init = async () => {
      isLoading.value = true;
      detailInfo.value = await getAlbumDetailData(id);

      await getComments();
      isLoading.value = false;
    };

    onMounted(() => init());

    // 处理剩余字数
    const inputRestWord = ref(140);
    const commentInput = ref<HTMLTextAreaElement | null>(null);
    const calcWord = () => {
      const text = commentInput.value.value;
      const english = text.match(/[a-zA-Z]/g)?.length || 0;
      const chinese = text.length - english;
      inputRestWord.value = Math.floor(140 - english / 2 - chinese);
    };
    const handleCalcRestWord = debounce(calcWord, 300);

    // 处理分页
    const handlePageChange = (currentPage: number) => {
      emit("pagin-change");
      commentData.currentPage = currentPage;
      getComments();
    };

    return {
      isLoading,
      detailInfo,
      showDescMore,
      activeName,
      ...toRefs(commentData),
      inputRestWord,
      commentInput,
      handleCalcRestWord,
      handlePageChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.playlist-detail {
  .detail-top {
    display: flex;
    align-items: flex-start;
    padding: 2% $tab-padding-horizon;

    .top-cover {
      position: relative;
      flex: 0 0 auto;
      width: 184px;
      margin-right: 60px;

      > img {
        width: 100%;
      }

      .album-mask {
        position: absolute;
        top: -14px;
        right: -36px;
        width: 220px;
        height: 220px;
        background: url(../../assets/images/album.png) no-repeat;
        background-position: 12px;
        background-size: contain;
        z-index: -1;
      }
    }

    .top-content {
      flex: 1;

      .content-title {
        font-size: 23px;
        font-weight: bold;

        > span {
          display: inline-block;
          padding: 2px 4px;
          font-size: 14px;
          font-weight: normal;
          color: $primary-color;
          border: 1px solid $primary-color;
          border-radius: 2px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      .content-options {
        display: flex;
        align-items: center;
        margin: 15px 0 18px 0;
        font-size: 14px;
        color: #444;

        .option-item {
          display: flex;
          align-items: center;
          padding: 5px 14px;
          margin-right: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 25px;
          cursor: pointer;

          .iconfont {
            font-size: 22px;
            margin-right: 4px;
          }

          &.highlight {
            padding-right: 4px;
            background: $primary-color;
            color: #fff;

            > span {
              position: relative;

              &::after {
                content: "";
                position: absolute;
                top: -6px;
                right: -10px;
                width: 1px;
                height: 26px;
                background: #fefefe3d;
              }
            }

            .icon-plus {
              margin-left: 16px;
            }
          }
        }
      }

      .content-artist,
      .content-time {
        font-size: 13px;
        line-height: 2;
        color: #555;

        .label {
          color: #444;
        }
      }

      .content-artist {
        .value {
          color: #5480b1;
          cursor: pointer;
        }
      }
    }
  }

  .detail-bottom {
    padding: 0 $tab-padding-horizon;

    .bottom-comment {
      padding: 1% 0;
      .comment-box {
        position: relative;
        .box-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 8px;
          box-sizing: border-box;
          outline: none;
          color: #333;
          resize: none;
        }

        .input-rest {
          position: absolute;
          top: 5em;
          right: 0.6em;
          font-size: 12px;
          color: #666;
        }

        .box-options {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .options-left {
            .iconfont {
              margin-right: 6px;
              font-size: 24px;
              color: #444;
              cursor: pointer;
            }
          }

          .options-right {
            padding: 8px 16px;
            color: #666;
            border: 1px solid #e1e1e1;
            border-radius: 25px;
            font-size: 14px;
          }
        }
      }
    }

    .bottom-desc {
      padding: 2% 0;
      line-height: 2;
      font-size: 14px;
      .desc-title {
        font-weight: bold;
      }

      .desc-item {
        text-indent: 2em;
        color: #666;
      }
    }
  }
}
</style>
