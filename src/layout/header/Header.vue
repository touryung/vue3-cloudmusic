<template>
  <header class="header">
    <div class="header-left">
      <div class="header-title" @click="handleTitleClick">
        <i class="iconfont icon-music" />
        <span class="header-title-name">网 抑 云 音 乐</span>
      </div>
      <div class="header-history">
        <i class="iconfont icon-preview-left" @click="handleHistoryBack" />
        <i class="iconfont icon-preview-right" @click="handleHistoryForward" />
      </div>
      <div class="header-search">
        <SearchList />
      </div>
    </div>
    <div class="header-right">
      <div class="header-user">
        <img src="../../assets/images/avatar.png" alt="" class="avatar" />
        <span class="username">touryung</span>
        <i class="iconfont icon-down" />
      </div>
      <div class="header-options">
        <i class="iconfont icon-theme" />
        <i class="iconfont icon-set" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import SearchList from "./searchList/SearchList";

export default defineComponent({
  name: "Header",
  components: {
    SearchList,
  },
  setup() {
    const router = useRouter();
    const handleHistoryBack = () => router.go(-1);
    const handleHistoryForward = () => router.go(1);
    const handleTitleClick = () => router.push("/");

    return {
      handleHistoryBack,
      handleHistoryForward,
      handleTitleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: $min-width;
  height: $header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ec4141;
  color: #f2f3f4;
  box-sizing: border-box;
  padding: 0 20px;
  z-index: 100;

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
  }

  .header-left {
    .header-title {
      flex: 0 0 200px;
      display: flex;

      .icon-music {
        padding: 4px;
        margin-right: 10px;
        font-size: 30px;
      }

      .header-title-name {
        align-self: center;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .header-history {
      flex: 0 0 100px;
      text-align: center;

      .iconfont {
        padding: 4px;
        margin: 0 4px;
        font-size: 20px;
        background: #d83b3b;
        border-radius: 50%;
      }
    }
  }

  .header-right {
    justify-content: flex-end;

    .header-user {
      display: flex;
      align-items: center;
      position: relative;

      .avatar {
        width: 30px;
      }

      .username {
        margin: 0 8px;
      }
    }

    .header-options {
      .iconfont {
        margin: 0 8px;
        font-size: 25px;
      }
    }
  }
}
</style>
