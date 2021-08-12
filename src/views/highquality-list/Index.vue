<template>
  <div class="high-quality">
    <div class="quality-header">
      <h1 class="sub-title">精品歌单</h1>
      <span class="question" @click="handleQuestionClick" />
    </div>
    <div class="quality-list">
      <div
        class="list-item"
        v-for="item in currentHighQuality"
        :key="item.id"
        @click="handleShowDetail(item.id)"
      >
        <div class="item-left">
          <img :src="item.picUrl" alt="" />
          <i class="iconfont icon-choiceness-double" />
          <div class="left-count">
            <i class="iconfont icon-playlist-play" />
            <span>{{ item.playCount }}</span>
          </div>
          <div class="left-decorate">
            <i class="iconfont icon-play" />
          </div>
        </div>
        <div class="item-right">
          <h1 class="right-title">{{ item.name }}</h1>
          <div class="right-creator">by {{ item.nickName }}</div>
          <p class="right-desc">
            <span class="desc-tag">{{ item.tag }}</span>
            {{ item.copywriter }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { playlistStore } from "@/store/modules/playlist";
import { computed, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const currentHighQuality = computed(() => playlistStore.currentHighQuality);

    onMounted(() => {
      if (!currentHighQuality.value.length) router.push("/playlist");
    });

    const handleShowDetail = (id: number) => router.push(`/playlist/${id}`);
    const handleQuestionClick = () =>
      open("https://music.163.com/#/topic?id=202001");

    return {
      currentHighQuality,
      handleQuestionClick,
      handleShowDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.high-quality {
  .quality-header {
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;

    .sub-title {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      margin-right: 5px;
    }
    .question {
      width: 15px;
      height: 15px;
      border: 2px solid #888;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &::after {
        content: "？";
        position: relative;
        left: 3px;
        font-size: 13px;
        color: #888;
      }
    }
  }

  .quality-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .list-item {
      flex: 0 0 32%;
      display: flex;
      align-items: center;
      margin-right: 2%;
      margin-bottom: 20px;
      cursor: pointer;

      &:nth-child(3n) {
        margin-right: 0;
      }

      .item-left {
        flex: 0 0 132px;
        position: relative;
        overflow: hidden;

        > img {
          width: 100%;
        }

        .icon-choiceness-double {
          position: absolute;
          top: 0;
          left: 0;
          color: #fff;
          font-size: 18px;
          transform: rotateZ(-45deg);
          z-index: 1;
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          border-color: #f3b068 transparent transparent #f3b068;
          border-style: dashed;
          border-width: 15px;
          border-top-left-radius: 4px;
        }

        .left-count {
          position: absolute;
          top: 4px;
          right: 8px;
          font-size: 12px;
          color: #fff;
        }

        .left-decorate {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 50%;
          background: rgba(253, 253, 253, 0.9);
          color: $primary-color;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease-in-out;
          opacity: 0;

          .icon-play {
            position: relative;
            top: -1px;
            left: 3px;
            font-size: 13px;
          }
        }

        &:hover {
          .left-decorate {
            opacity: 1;
          }
        }
      }

      .item-right {
        margin-left: 10px;

        .right-title {
          font-size: 14px;
          @include maxWidthEllipsis(180px);
        }

        .right-creator {
          margin: 20px 0 30px 0;
          font-size: 12px;
          color: #999;
        }

        .right-desc {
          font-size: 12px;
          font-weight: 100;
          color: #cfcfcf;
          @include maxWidthEllipsis(180px);

          .desc-tag {
            display: inline-block;
            color: $primary-color;
            border: 1px solid $primary-color;
            padding: 0 2px;
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>
