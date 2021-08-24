import {
  getSongLyricsData,
  getSongCommentInfoData,
  getSimiSongs,
} from "@/api/player";
import { MODE } from "@/utils/constant";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "../index";

export interface Lyric {
  time: number;
  text: string;
}

export interface CurrentSongCommentInfo {
  hotComments: Comment[];
  comments: Comment[];
  total: number;
  pageCount: number;
}

@Module({ dynamic: true, namespaced: true, name: "player", store })
class Player extends VuexModule {
  // 当前歌曲
  currentSong: Song | null = null;
  @Mutation
  changeCurrentSong(song: Song) {
    this.currentSong = song;
  }

  // 当前歌曲下标
  currentIndex = -1;
  @Mutation
  changeCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  // 当前歌曲列表
  currentSongQueue: Song[] | [] = [];
  @Mutation
  changeCurrentSongQueue(queue: Song[]) {
    this.currentSongQueue = queue;
  }

  // 当前歌曲播放状态: 播放 | 暂停
  isPlaying = false;
  @Mutation
  changePlayStatus(status: boolean) {
    this.isPlaying = status;
  }

  // 当前播放模式: 单曲循环 | 随机播放 | ...
  mode = MODE.singleCycle;
  @Mutation
  changeMode() {
    // @ts-ignore
    this.mode = this.mode === MODE.randomPlay ? 0 : this.mode + 1;
  }

  // 当前音量大小
  volume = Number(sessionStorage.getItem("volume")) || 0.5;
  @Mutation
  changeVolume(volume: number) {
    this.volume = volume;
    sessionStorage.setItem("volume", String(volume));
  }

  // 歌词相关: 歌词数组、当前行号、当前歌词
  lyrics: Lyric[] = [];
  currentLineNumber = 0;
  currentLyric = "";
  @Mutation
  changeLyrics(lyrics: Lyric[]) {
    this.lyrics = lyrics;
  }
  @Mutation
  changeCurrentLineNumber(no: number) {
    this.currentLineNumber = no;
  }
  @Mutation
  changeCurrentLyric(lyric: string) {
    this.currentLyric = lyric;
  }
  @Action
  async getSongLyricsData() {
    const lyrics: Lyric[] = await getSongLyricsData(this.currentSong.id);
    this.changeLyrics(lyrics);
  }

  // 评论相关: 评论数组对象
  currentSongCommentInfo: CurrentSongCommentInfo = {
    hotComments: [],
    comments: [],
    total: 0,
    pageCount: 0,
  };
  @Mutation
  changeCurrentSongCommentInfo(currentSongCommentInfo: CurrentSongCommentInfo) {
    this.currentSongCommentInfo = currentSongCommentInfo;
  }
  @Action
  async getSongCommentInfoData(currentPage = 1) {
    const currentSongCommentInfo: CurrentSongCommentInfo =
      await getSongCommentInfoData(this.currentSong.id, currentPage);

    this.changeCurrentSongCommentInfo(currentSongCommentInfo);
  }

  simiSongs: Song[] | null = null;
  @Mutation
  changeSimiSongs(songs: Song[]) {
    this.simiSongs = songs;
  }
  @Action
  async getSimiSongsData() {
    const songs: Song[] = await getSimiSongs(this.currentSong.id);
    this.changeSimiSongs(songs);
  }
}

export const playerStore = getModule(Player);
