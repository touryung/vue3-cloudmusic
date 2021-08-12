import { getRequest } from "../request";
import {
  convertRanksInfo,
  convertRankSinger,
  convertRankSongs,
} from "./convert";

const REQUEST_URL = {
  rankSongs: "/playlist/detail",
  rankSinger: "/toplist/artist",
  ranks: "/toplist",
};

// 获取排行榜前五的歌曲
export const getRankSongs = (id: number) => {
  return getRequest(REQUEST_URL.rankSongs, { id }).then(convertRankSongs);
};

export const getRankSinger = () => {
  return getRequest(REQUEST_URL.rankSinger).then(convertRankSinger);
};

export const getRanksInfo = () => {
  return getRequest(REQUEST_URL.ranks).then(convertRanksInfo);
};
