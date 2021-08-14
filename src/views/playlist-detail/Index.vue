<template>
  <div class="playlist-detail" v-loading="isLoading">
    <div class="detail-top">
      <img :src="detailInfo.coverImgUrl" alt="" />
      <div class="top-content">
        <h1 class="content-title"><span>歌单</span>{{ detailInfo.name }}</h1>
        <div class="content-provider">
          <img :src="detailInfo.avatarUrl" alt="" />
          <span class="provider-name">{{ detailInfo.nickname }}</span>
          <span>{{ detailInfo.createTime }}创建</span>
        </div>
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
        <div class="content-tags" v-if="detailInfo.tags">
          <span class="label">标签 : </span>
          <span class="tag">{{ detailInfo.tags }}</span>
        </div>
        <div class="content-count">
          <span class="label">歌曲 : </span>{{ detailInfo.trackCount }} &nbsp;
          <span class="label">播放 : </span>{{ detailInfo.playCount }}
        </div>
        <div class="content-desc">
          <span class="label">简介 : </span>{{ detailInfo.subDescription }}
          <span v-if="!showDescMore">...</span>
          <p v-else v-html="detailInfo.description" />
          <i
            :class="`iconfont icon-${showDescMore ? 'up' : 'down-2'}`"
            @click="showDescMore = !showDescMore"
          />
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <Tabs v-model="activeName">
        <TabPane label="歌曲列表" name="songList">
          <SongList :songs="detailInfo.songs" />
        </TabPane>
        <TabPane
          :label="`评论(${detailInfo.commentCount || 0})`"
          name="songComment"
        >
          <div class="bottom-comment">
            <CommentBox />
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
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

import {
  PlaylistDetail,
  getPlaylistDetailData,
  getPlaylistCommentData,
} from "@/api/playlist/index";
import { useRoute } from "vue-router";

import SongList from "@/components/song-list/Index.vue";
import CommentBox from "@/components/CommentBox.vue";

export default defineComponent({
  components: {
    SongList,
    CommentBox,
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
    const detailInfo = ref<Partial<PlaylistDetail>>({});

    const commentData = reactive({
      hotComments: [],
      comments: [],
      total: 0,
      pageCount: 0,
      currentPage: 1,
    });
    const getComments = async () => {
      const { hotComments, comments, total, pageCount } =
        await getPlaylistCommentData(id, commentData.currentPage);
      commentData.hotComments = hotComments;
      commentData.comments = comments;
      commentData.total = total;
      commentData.pageCount = pageCount;
    };

    const init = async () => {
      isLoading.value = true;
      detailInfo.value = await getPlaylistDetailData(id);
      await getComments();
      isLoading.value = false;
    };

    onMounted(() => init());

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

    > img {
      flex: 0 0 auto;
      width: 184px;
      margin-right: 20px;
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

      .content-provider {
        display: flex;
        align-items: center;
        height: 50px;
        font-size: 12px;
        color: #666;

        > img {
          width: 28px;
          border-radius: 50%;
          cursor: pointer;
        }

        .provider-name {
          margin: 0 8px;
          color: #5480b1;
          cursor: pointer;
        }
      }

      .content-options {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
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

      .content-tags,
      .content-count,
      .content-desc {
        font-size: 13px;
        line-height: 2;
        color: #555;

        .label {
          color: #444;
        }
      }

      .content-tags {
        .tag {
          color: #5480b1;
          cursor: pointer;
        }
      }

      .content-desc {
        position: relative;

        .iconfont {
          position: absolute;
          top: -10px;
          right: 0;
          font-size: 22px;
          color: #999;
          cursor: pointer;
        }
      }
    }
  }

  .detail-bottom {
    padding: 0 $tab-padding-horizon;

    .bottom-comment {
      padding: 1% 0;
    }
  }
}
</style>
