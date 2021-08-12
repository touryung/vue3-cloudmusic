<template>
  <div class="mv">
    <div class="mv-header">全部MV</div>
    <div class="mv-select">
      <div class="select-item">
        <span class="item-title">地区: </span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            v-for="item in mvAreas"
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
        <span class="item-title">类型: </span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            v-for="item in mvTypes"
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
        <span class="item-title">排序: </span>
        <div class="item-conditions">
          <div
            class="conditions-wrapper"
            v-for="item in mvOrders"
            :key="`order${item.value}`"
          >
            <span
              class="conditions-text"
              :class="{ active: item.value === order }"
              @click="handleChangeCondition('order', item.value)"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mv-list" v-loading="isLoading">
      <div class="list-item" v-for="item in mvList" :key="item.id">
        <MvItem :mvItem="item" />
      </div>
    </div>
    <Pagin
      :pageCount="pageCount"
      :pagerCount="9"
      :currentPage="currentPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { MV_AREAS, MV_TYPES, MV_ORDERS } from "@/utils/constant";

import { getMvListData } from "@/api/video/index";
import MvItem from "@/components/mvlist-item/Index.vue";

export default defineComponent({
  components: {
    MvItem,
  },
  setup(props, { emit }) {
    const isLoading = ref<boolean>(false);
    const mvList = ref<Mv[]>([]);
    const conditions = reactive({
      mvAreas: MV_AREAS,
      mvTypes: MV_TYPES,
      mvOrders: MV_ORDERS,
      area: "内地",
      type: "全部",
      order: "最新",
    });

    const paginData = reactive({ currentPage: 1, pageCount: 0 });

    // 获取数据更新变量
    const getCurrentMvList = async () => {
      isLoading.value = true;

      const { mvs, pageCount } = await getMvListData(
        conditions.area,
        conditions.type,
        conditions.order,
        paginData.currentPage
      );

      mvList.value = mvs;
      paginData.pageCount = pageCount;

      isLoading.value = false;
    };

    onMounted(() => getCurrentMvList());

    // 切换选项
    const handleChangeCondition = (type: string, value: string | number) => {
      conditions[type] = value;
      paginData.currentPage = 1;

      mvList.value = [];
      getCurrentMvList();
    };

    const handlePageChange = (currentPage: number) => {
      emit("pagin-change");
      paginData.currentPage = currentPage;
      getCurrentMvList();
    };

    const handleShowDetail = (id: number) => alert(`MV${id}详情`);

    return {
      isLoading,
      mvList,
      ...toRefs(conditions),
      ...toRefs(paginData),
      handleChangeCondition,
      handlePageChange,
      handleShowDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.mv {
  padding: 2% 4%;

  .mv-header {
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: bold;
  }
  .mv-select {
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
          width: 72px;
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

  .mv-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .list-item {
      flex: 0 0 32%;
      margin-bottom: 20px;
    }
  }
}
</style>
