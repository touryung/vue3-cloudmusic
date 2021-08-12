import { getRankSinger, getRankSongs } from "./index";
import { translateCount, formatDate } from "@/utils/utils";
import { AxiosResponse } from "axios";

export const convertRankSongs = (res: AxiosResponse) => {
  const { playlist } = res.data;
  if (!playlist) return [];

  const songs = [];
  const { tracks } = playlist;

  for (const track of tracks) {
    // 歌曲榜单取前五首
    if (songs.length === 5) return songs;
    songs.push({
      id: track.id,
      name: track.name,
      picUrl: track.al.picUrl,
      artists: track.ar.map((item) => ({ id: item.id, name: item.name })),
    });
  }
};

export const convertRankSinger = (res: AxiosResponse) => {
  const { artists, updateTime } = res.data.list;
  if (!artists || !updateTime) return;

  const ars = [];
  for (const artist of artists) {
    // 歌手榜单取前五个
    if (ars.length === 5) return { artists: ars, updateTime };

    ars.push({
      id: artist.id,
      name: artist.name,
      picUrl: artist.img1v1Url,
    });
  }
};

export const convertRanksInfo = async (res: AxiosResponse) => {
  const { list, artistToplist } = res.data;
  if (!list) return [];

  const commonRanksInfo = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    let songs = [];
    let backgroundImgUrl = "";
    // 前四项是官方榜单
    if (i < 4) {
      songs = await getRankSongs(item.id);
      backgroundImgUrl = songs[0].picUrl;
    }

    commonRanksInfo.push({
      id: item.id,
      name: item.name,
      coverImgUrl: item.coverImgUrl,
      updateTime: formatDate(item.updateTime, "MM月dd日"),
      playCount: translateCount(item.playCount),
      songs,
      backgroundImgUrl,
    });
  }

  const { artists, updateTime } = await getRankSinger();

  return {
    officialRanks: commonRanksInfo.slice(0, 4),
    globalRanks: commonRanksInfo.slice(4),
    singerRank: {
      coverImgUrl: artistToplist.coverUrl,
      backgroundImgUrl: artists[0].picUrl,
      updateTime: formatDate(updateTime, "MM月dd日"),
      artists,
    },
  };
};
