import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
const Recommend = () => import("@/views/recommend/Index.vue");
const Playlist = () => import("@/views/playlist/Index");
const Rank = () => import("@/views/rank/Index.vue");
const Singer = () => import("@/views/singer/Index.vue");
const NewMusic = () => import("@/views/new-music/Index.vue");
const PlaylistDetial = () => import("@/views/playlist-detail/Index.vue");
const HighQualityList = () => import("@/views/highquality-list/Index.vue");
const AlbumDetial = () => import("@/views/album-detail/Index.vue");
const MvList = () => import("@/views/mvlist/Index.vue");
const SingerDetail = () => import("@/views/singer-detail/Index.vue");
const MvDetail = () => import("@/views/mv-detail/Index.vue");
const SearchDetail = () => import("@/views/search-detail/Index.vue");
const NotFound = () => import("@/views/notfound/Index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    redirect: "/recommend",
    children: [
      {
        path: "/recommend",
        name: "recommend",
        component: Recommend,
      },
      {
        path: "/playlist",
        name: "playlist",
        component: Playlist,
      },
      {
        path: "/rank",
        name: "rank",
        component: Rank,
      },
      {
        path: "/singer",
        name: "singer",
        component: Singer,
      },
      {
        path: "/newMusic",
        name: "newMusic",
        component: NewMusic,
      },
      {
        path: "/playlist/:id",
        name: "playlistDetial",
        component: PlaylistDetial,
        meta: { isTabCover: true },
      },
      {
        path: "/highQuality",
        name: "highQuality",
        component: HighQualityList,
      },
      {
        path: "/album/:id",
        name: "albumDetial",
        component: AlbumDetial,
        meta: { isTabCover: true },
      },
      {
        path: "/mvList",
        name: "mvList",
        component: MvList,
        meta: { isTabCover: true },
      },
      {
        path: "/singer/:id",
        name: "singerDetail",
        component: SingerDetail,
        meta: { isTabCover: true },
      },
      // 渲染在命名路由出口
      {
        path: "/mv/:id",
        name: "mvDetail",
        components: {
          mvDetail: MvDetail,
        },
      },
      {
        path: "/search/:keywords",
        name: "searchDetail",
        component: SearchDetail,
        meta: { isTabCover: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
