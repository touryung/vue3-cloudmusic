<template>
  <div class="singer">
    <div class="singer-cover">
      <div
        class="cover-filter"
        :style="{
          background: `url(${singerRank.backgroundImgUrl})`,
          backgroundSize: 'cover',
        }"
      />
      <div class="cover-time">{{ singerRank.updateTime }}更新</div>
      <img :src="singerRank.coverImgUrl" alt="" />

      <div class="cover-decorate">
        <i class="iconfont icon-play" />
      </div>
    </div>
    <div class="singer-list">
      <div
        class="list-item"
        v-for="(item, index) in singerRank.artists"
        :key="item.id"
        @click="handleShowSingerDetail(item.id)"
      >
        <div class="item-left">
          <span class="left-index" :class="index <= 2 ? 'top' : ''">
            {{ index + 1 }}
          </span>
          <span class="left-split">-</span>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <span class="more" @click="handleShowMoreSinger">
        查看全部<i class="iconfont icon-right" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    singerRank: {
      type: Object as PropType<SingerRank>,
      default: () => ({}),
    },
  },
  setup() {
    const router = useRouter();

    const handleShowSingerDetail = (id: number) => router.push(`/singer/${id}`);
    const handleShowMoreSinger = () => router.push("/singer");

    return {
      handleShowSingerDetail,
      handleShowMoreSinger,
    };
  },
});
</script>

<style lang="scss" scoped>
.singer {
  display: flex;
  margin-bottom: 20px;

  .singer-cover {
    position: relative;
    width: 172px;
    height: 172px;
    cursor: pointer;
    overflow: hidden;

    .cover-filter {
      width: 100%;
      height: 100%;
      filter: blur(2px);
      border-radius: 4px;
    }

    .cover-time {
      position: absolute;
      bottom: 25%;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #f1f2f3;
      z-index: 2;
    }

    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 4px;
      opacity: 0.9;
    }

    .cover-decorate {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: $primary-color;
      background: rgba(253, 253, 253, 0.6);
      border-radius: 50%;
      display: none;
      z-index: 3;

      .icon-play {
        position: relative;
        left: 3px;
        font-size: 18px;
      }
    }

    &:hover {
      .cover-decorate {
        display: block;
      }
    }
  }

  .singer-list {
    flex: 1;
    margin-left: 40px;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 34px;
      padding: 0 10px;
      font-size: 12px;
      color: #444;
      border-radius: 4px;

      &:nth-child(odd) {
        background: #f8f8f8;
      }

      &:hover {
        background: #f1f2f3;
      }

      .left-index {
        font-size: 14px;
        color: #999;

        &.top {
          color: $active-color;
        }
      }

      .left-split {
        margin: 0 10px;
      }
    }

    .more {
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      font-size: 12px;
      font-weight: 100;
      cursor: pointer;

      .iconfont {
        font-size: 12px;
      }
    }
  }
}
</style>
