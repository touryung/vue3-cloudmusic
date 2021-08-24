<template>
  <div class="notfound-container">
    <img src="@/assets/images/404.png" alt="404" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.notfound-container {
  > img {
    display: block;
    margin: 50px auto;
  }
}
</style>
