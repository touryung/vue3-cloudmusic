import {
  VuexModule,
  getModule,
  Module,
  Mutation,
  Action,
} from "vuex-module-decorators";
import { getHighQualityData } from "@/api/playlist/index";
import store from "../index";

@Module({ dynamic: true, namespaced: true, name: "playlist", store })
class Playlist extends VuexModule {
  // 当前选中分类
  activeCategory = "";
  @Mutation
  changeActiveCategory(category: string) {
    this.activeCategory = category;
  }

  // 当前精品歌单
  currentHighQuality: PlayListItem[] = [];
  @Mutation
  changeHighQuality(list: PlayListItem[]) {
    this.currentHighQuality = list;
  }

  /**
   * 精品歌单不重要，异步加载
   * @param category
   */
  @Action
  getHighQualityList(category: string) {
    getHighQualityData(category).then(({ playlists }) => {
      this.changeHighQuality(playlists);
    });
  }
}

export const playlistStore = getModule(Playlist);
