<template>
  <div class="official-item">
    <!-- 左侧部分 -->
    <div class="official-cover">
      <!-- 背景图 -->
      <div
        class="cover-filter"
        :style="{
          background: `url(${officialRank.backgroundImgUrl})`,
          backgroundSize: 'cover',
        }"
      />
      <div class="cover-time">{{ officialRank.updateTime }}更新</div>
      <img :src="officialRank.coverImgUrl" alt="" />
      <!-- 鼠标悬浮图标 -->
      <div class="cover-decorate">
        <i class="iconfont icon-play" />
      </div>
    </div>
    <!-- 右侧列表 -->
    <div class="official-list">
      <div
        class="list-item"
        v-for="(item, index) in officialRank.songs"
        :key="item.id"
        @click="handlePlaySong(index)"
      >
        <div class="item-left">
          <span class="left-index" :class="index <= 2 ? 'top' : ''">
            {{ index + 1 }}
          </span>
          <span class="left-split">-</span>
          <span>{{ item.name }}</span>
        </div>
        <span class="item-right">
          <span v-for="(artist, index) in item.artists" :key="artist.id">
            {{
              `${artist.name}${index === item.artists.length - 1 ? "" : " / "}`
            }}
          </span>
        </span>
      </div>
      <span class="more" @click="handleShowDetail">
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
    officialRank: {
      type: Object as PropType<CommonRank>,
      default: () => ({}),
    },
  },
  setup() {
    const router = useRouter();

    const handlePlaySong = (index: number) => alert("播放歌曲" + index);
    const handleShowDetail = () => alert("查看全部");

    return {
      handlePlaySong,
      handleShowDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.official-item {
  display: flex;
  margin-bottom: 20px;

  .official-cover {
    position: relative;
    width: 172px;
    height: 172px;
    cursor: pointer;
    // 除去多余的模糊阴影
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

  .official-list {
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

      .item-right {
        color: #999;
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
