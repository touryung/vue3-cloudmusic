<template>
  <div class="singer">
    <!-- 歌手筛选 -->
    <div class="singer-select">
      <div class="select-item">
        <span class="item-title">语种: </span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            :class="{ 'no-first': item.value !== -1 }"
            v-for="item in singerAreas"
            :key="`area${item.value}`"
          >
            <span
              class="conditions-text"
              :class="{ active: item.value === area }"
              @click="handleChangeCondition('area', item.value)"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <div class="select-item">
        <span class="item-title">分类: </span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            :class="{ 'no-first': item.value !== -1 }"
            v-for="item in singerTypes"
            :key="`type${item.value}`"
          >
            <span
              class="conditions-text"
              :class="{ active: item.value === type }"
              @click="handleChangeCondition('type', item.value)"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <div class="select-item">
        <span class="item-title">筛选: </span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            v-for="item in alphaTypes"
            :key="`alpha${item.value}`"
          >
            <span
              class="conditions-text"
              :class="{ active: item.value === alpha }"
              @click="handleChangeCondition('alpha', item.value)"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌手列表 -->
    <div class="singer-list" v-loading="isLoading">
      <div
        class="list-item"
        v-for="item in singerList"
        :key="item.id"
        @click="handleShowDetail(item.id)"
      >
        <img :src="item.picUrl" alt="" />
        <div class="item-bottom">
          <span>{{ item.name }}</span>
          <i class="iconfont icon-user" />
        </div>
      </div>
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
import { SINGER_AREAS, SINGER_TYPES, ALPHA_TYPES } from "@/utils/constant";

import { getSingerListData } from "@/api/singer/index";
import { lazyLoad, debounce } from "@/utils/utils";
import { on, off } from "@/utils/dom";

export default defineComponent({
  setup() {
    const isLoading = ref<boolean>(false);
    const singerAreas = ref<SingerSelectArgs[]>(SINGER_AREAS);
    const singerTypes = ref<SingerSelectArgs[]>(SINGER_TYPES);
    const alphaTypes = ref<SingerSelectArgs[]>(ALPHA_TYPES);
    const singerList = ref<Artist[]>([]);
    const conditions = reactive({
      area: -1,
      type: -1,
      alpha: "",
      currentPage: 1,
      more: false,
    });

    // 获取数据更新变量
    const getCurrentSingerList = async () => {
      isLoading.value = true;

      const { singers, more } = await getSingerListData(
        conditions.area,
        conditions.type,
        conditions.alpha,
        conditions.currentPage
      );

      singerList.value.push(...singers);
      conditions.more = more;
      if (more) conditions.currentPage++;

      isLoading.value = false;
    };

    onMounted(() => {
      getCurrentSingerList();
      on(
        document.getElementById("mainPage"),
        "scroll",
        debounce(
          () =>
            lazyLoad(
              document.getElementById("mainPage"),
              conditions.more,
              getCurrentSingerList
            ),
          1000
        )
      );
    });
    onUnmounted(() => off(document.getElementById("mainPage"), "scroll"));

    // 切换选项
    const handleChangeCondition = (type: string, value: string | number) => {
      conditions[type] = value;
      conditions.currentPage = 1;

      singerList.value = [];
      getCurrentSingerList();
    };

    const handleShowDetail = (id: number) => alert(`歌手${id}详情`);

    return {
      isLoading,
      singerAreas,
      singerTypes,
      alphaTypes,
      singerList,
      ...toRefs(conditions),
      handleChangeCondition,
      handleShowDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.singer {
  .singer-select {
    font-size: 13px;
    color: #666;

    .select-item {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      margin: 6px 0;

      .item-title {
        margin-right: 10px;
      }

      .item-conditions {
        flex: 1;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .conditions-wrapper {
          position: relative;
          width: 64px;
          margin-bottom: 15px;
          text-align: center;

          .conditions-text {
            padding: 3px 10px;
            cursor: pointer;
            border-radius: 25px;

            &.active {
              color: $active-color;
              background-color: #fdf5f5;
            }
          }

          &.no-first {
            width: 78px;
          }

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 12px;
            background: #e8e8e8;
          }

          &:last-child::after {
            display: none;
          }
        }
      }
    }
  }

  .singer-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .list-item {
      flex: 0 0 15%;
      margin-right: 2%;
      margin-bottom: 20px;
      cursor: pointer;

      &:nth-of-type(6n) {
        margin-right: 0;
      }

      > img {
        width: 100%;
        height: 100%;
      }

      .item-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 24px;
        padding: 0 2px;

        .icon-user {
          padding: 2px;
          color: #fff;
          background: $active-color;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
