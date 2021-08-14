<template>
  <div class="mv-detail" ref="mvDetailRef">
    <div class="detail-left">
      <h1 class="left-title" @click="handleBackClick">
        <i class="iconfont icon-preview-left" />
        <span>{{ isMv ? "MV" : "视频" }}详情</span>
      </h1>
      <video
        width="640"
        height="360"
        autoplay
        controls
        :src="videoInfo.url"
        :poster="videoInfo.posterUrl"
      />
      <div class="video-info">
        <div class="info-creator">
          <img :src="videoInfo.avatarUrl" alt="" />
          <span>{{ videoInfo.creatorName }}</span>
        </div>
        <div class="info-desc">
          <h1 class="video-name">
            {{ videoInfo.name }}
            <i
              v-if="videoInfo.desc"
              :class="`iconfont icon-${showDesc ? 'up' : 'down-2'}`"
              @click="showDesc = !showDesc"
            />
          </h1>
          <div class="video-count">
            发布 : {{ videoInfo.publishTime }} &nbsp;&nbsp;&nbsp; 播放 :
            {{ videoInfo.playCount }}
          </div>
        </div>
        <!-- 小标签 -->
        <ul v-if="videoInfo.videoGroup?.length">
          <li class="group" v-for="item in videoInfo.videoGroup" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
        <p v-if="showDesc" class="video-desc">{{ videoInfo.desc }}</p>
        <!-- 计数按钮 -->
        <ul>
          <li class="option">
            <i class="iconfont icon-zan" />
            <span>赞({{ videoInfo.likedCount }})</span>
          </li>
          <li class="option">
            <i class="iconfont icon-player-collect" />
            <span>收藏({{ videoInfo.subCount }})</span>
          </li>
          <li class="option">
            <i class="iconfont icon-share" />
            <span>分享({{ videoInfo.shareCount }})</span>
          </li>
          <li class="option">
            <i class="iconfont icon-player-download" />
            <span>下载MV</span>
          </li>
        </ul>
      </div>

      <div class="video-comment">
        <h1 class="comment-title">
          评论<span>({{ total }})</span>
        </h1>
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
          @page-change="handlePageChange"
        />
      </div>
    </div>
    <div class="detail-right">
      <h1 class="right-title">相关推荐</h1>
      <ul>
        <li
          class="related-video"
          v-for="item in relatedVideoInfo"
          :key="item.id"
          @click="handleChangeVideo(item.id)"
        >
          <div class="video-cover">
            <img :src="item.coverUrl" alt="" />
            <div class="video-count">
              <i class="iconfont icon-playlist-play" />
              <span>{{ item.playCount }}</span>
            </div>
            <div class="video-duration">{{ item.durationStr }}</div>
          </div>
          <div class="video-info">
            <p class="info-title">{{ item.title }}</p>
            <div class="info-creator">by {{ item.creator }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getMvCommentData,
  getMvDetailData,
  getRelatedVideoData,
  getVideoCommentData,
  getVideoDetailData,
} from "@/api/video";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  RouteLocationNormalized,
} from "vue-router";

import CommentBox from "@/components/CommentBox.vue";
import { scrollTop } from "@/utils/animation";

export default defineComponent({
  components: {
    CommentBox,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const handleBackClick = () => router.go(-1);
    const id = String(route.params.id);

    const isMv = ref<boolean>(true);
    const showDesc = ref<boolean>(false);

    const commentInfo = reactive({
      hotComments: [],
      comments: [],
      total: 0,
      pageCount: 0,
      currentPage: 1,
      id, // 记录推荐视频 id，初始化为当前路由 id
    });
    const getComments = async () => {
      const getCommentsFunc = isMv.value
        ? getMvCommentData
        : getVideoCommentData;

      const { hotComments, comments, total, pageCount } = await getCommentsFunc(
        commentInfo.id,
        commentInfo.currentPage
      );

      commentInfo.hotComments = hotComments;
      commentInfo.comments = comments;
      commentInfo.total = total;
      commentInfo.pageCount = pageCount;
    };
    const mvDetailRef = ref<HTMLElement | null>(null);
    const handlePageChange = (currentPage: number) => {
      scrollTop(mvDetailRef, 800);
      commentInfo.currentPage = currentPage;
      getComments();
    };

    const videoInfo = ref<any>({});
    const relatedVideoInfo = ref<any>([]);
    const init = async (id: string) => {
      if (isMv.value) {
        videoInfo.value = await getMvDetailData(id);
        relatedVideoInfo.value = await getRelatedVideoData(id);
      } else {
        videoInfo.value = await getVideoDetailData(id);
        relatedVideoInfo.value = await getRelatedVideoData(id);
      }
      getComments();
    };
    const handleChangeVideo = (id: string) => {
      commentInfo.currentPage = 1;
      router.push(`/mv/${id}`);
    };

    onMounted(() => {
      const id = String(route.params.id);
      commentInfo.id = id;
      isMv.value = /[a-zA-Z]/g.test(id) ? false : true;
      init(commentInfo.id);
    });
    onBeforeRouteUpdate((to: RouteLocationNormalized) => {
      const id = String(to.params.id);
      commentInfo.id = id;
      isMv.value = /[a-zA-Z]/g.test(id) ? false : true;
      init(commentInfo.id);
    });

    return {
      isMv,
      showDesc,
      videoInfo,
      relatedVideoInfo,
      mvDetailRef,
      ...toRefs(commentInfo),
      handleBackClick,
      handlePageChange,
      handleChangeVideo,
    };
  },
});
</script>

<style lang="scss" scoped>
.mv-detail {
  position: fixed;
  width: 100%;
  top: $header-height;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  padding: 0 12%;
  box-sizing: border-box;
  background: #fff;
  overflow: auto;
  z-index: 3;
  user-select: none;

  .detail-left {
    flex: 0 0 640px;

    .left-title {
      height: 60px;
      line-height: 60px;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 20px;
        font-weight: initial;
        color: #666;
      }
    }

    > video {
      outline: none;
    }

    .video-info {
      margin: 16px 0;

      .info-creator {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        margin-bottom: 10px;

        > img {
          width: 52px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .info-desc {
        .video-name {
          font-size: 22px;
          font-weight: bold;
          color: #444;
          line-height: 1.2;

          .iconfont {
            font-size: 22px;
            cursor: pointer;
          }
        }

        .video-count {
          margin: 20px 0;
          font-size: 12px;
          color: #dfdfdf;
        }
      }

      .video-desc {
        font-size: 12px;
        line-height: 1.5;
        @include multipleNoWrap(4);
      }

      .group {
        display: inline-block;
        padding: 4px 8px;
        margin: 0 4px 16px 0;
        background: #f1f1f1;
        color: #444;
        font-size: 12px;
        border-radius: 10px;
        cursor: pointer;
      }

      .option {
        display: inline-flex;
        align-items: center;
        padding: 4px 22px;
        margin: 16px 10px 16px 0;
        border: 1px solid #e1e1e1;
        color: #444;
        font-size: 13px;
        border-radius: 25px;
        cursor: pointer;

        .iconfont {
          margin-right: 4px;
          font-size: 22px;
        }
      }
    }

    .video-comment {
      margin-bottom: 40px;

      .comment-title {
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;

        > span {
          font-size: 12px;
          font-weight: initial;
          color: #aaa;
          margin-left: 5px;
        }
      }
    }
  }

  .detail-right {
    flex: 1;
    margin-left: 30px;

    .right-title {
      height: 60px;
      line-height: 60px;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }

    .related-video {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      cursor: pointer;

      .video-cover {
        position: relative;

        > img {
          width: 148px;
        }

        .video-count {
          position: absolute;
          top: 4px;
          right: 8px;
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #fff;
        }

        .video-duration {
          position: absolute;
          bottom: 6px;
          right: 8px;
          font-size: 12px;
          color: #fff;
        }
      }

      .video-info {
        margin-left: 10px;
        font-size: 13px;

        .info-title {
          height: 40px;
          line-height: 1.5;
          margin: 10px 0;
          @include multipleNoWrap(2);
        }

        .info-creator {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>
