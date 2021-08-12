<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners" :key="banner">
        <img :src="banner" alt="" />
      </div>
    </div>
    <div class="swiper-pagination" />
    <div class="swiper-button-prev" />
    <div class="swiper-button-next" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from "vue";

import Swiper from "swiper";
import "swiper/css/swiper.css";

export default defineComponent({
  props: {
    banners: {
      type: Array as PropType<string[]>,
    },
  },
  setup() {
    onMounted(() => {
      new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
        },
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        effect: "coverflow",
        slidesPerView: 2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2,
          slideShadows: true,
        },
      });
    });
  },
});
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  // 小点大小
  :deep(.swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
  }

  --swiper-navigation-color: #eee; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 16px; /* 设置按钮大小 */
}
</style>
