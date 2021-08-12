import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// 导入自定义指令
import clickOutside from "@/directives/click-outside";
import vLoading from "@/directives/loading/index";

import Pagin from "@/components/pagin/Index.vue";
import Tabs from "@/components/tabs/Index.vue";
import TabPane from "@/components/tabs/TabPane.vue";
import Comments from "@/components/comments/Index.vue";

// 导入全局样式
import "@/assets/css/index.scss";

const app = createApp(App);
app.use(store).use(router);
app
  .component("Pagin", Pagin)
  .component("Tabs", Tabs)
  .component("TabPane", TabPane)
  .component("Comments", Comments);
app.directive("outside", clickOutside).directive("loading", vLoading);
app.mount("#app");
