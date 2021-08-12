<template>
  <div class="rank" v-loading="isLoading">
    <h1 class="rank-type">官方榜</h1>
    <div class="rank-official">
      <OfficialItem
        v-for="item in officialRanks"
        :key="item.id"
        :officialRank="item"
      />
      <SingerRank
        v-if="Object.keys(singerRank).length"
        :singerRank="singerRank"
      />
    </div>
    <h1 class="rank-type">全球榜</h1>
    <div class="rank-global">
      <GlobalItem
        v-for="item in globalRanks"
        :key="item.id"
        :globalRank="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

import OfficialItem from "./components/OfficialItem.vue";
import SingerRank from "./components/SingerRank.vue";
import GlobalItem from "./components/GlobalItem.vue";
import { getRanksInfo } from "@/api/rank/index";

interface RankInfo {
  officialRanks: CommonRank[];
  globalRanks: CommonRank[];
  // @ts-ignore
  singerRank: SingerRank | {};
}

export default defineComponent({
  components: {
    OfficialItem,
    SingerRank,
    GlobalItem,
  },
  setup() {
    const isLoading = ref<boolean>(false);

    const rankData = reactive<RankInfo>({
      officialRanks: [],
      globalRanks: [],
      singerRank: {},
    });

    const init = async () => {
      isLoading.value = true;

      const { officialRanks, globalRanks, singerRank }: any =
        await getRanksInfo();
      rankData.officialRanks = officialRanks;
      rankData.globalRanks = globalRanks;
      rankData.singerRank = singerRank;

      isLoading.value = false;
    };

    onMounted(() => init());

    return {
      isLoading,
      ...toRefs(rankData),
    };
  },
});
</script>

<style lang="scss" scoped>
.rank {
  .rank-type {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
  }

  .rank-global {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
