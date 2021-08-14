import { formatDate, formatDuration, translateCount } from "@/utils/utils";
import { PLAYLIST_LIMIT } from "@/utils/constant";
import { AxiosResponse } from "axios";
import { getSongsData } from "./index";

export const convertCategory = (res: AxiosResponse) => {
  return res.data;
};

// 转换歌单内容
export const convertPlaylists = (res: AxiosResponse) => {
  const { playlists, total } = res.data;
  const convertPlaylists: PlayListItem[] = playlists.map((list) => ({
    id: list.id,
    name: list.name,
    picUrl: list.coverImgUrl,
    playCount: translateCount(list.playCount),
    nickName: list.creator.nickname,
    copywriter: list.copywriter || "",
    tag: list.tag || "",
  }));

  return {
    playlists: convertPlaylists,
    pageCount:
      total % PLAYLIST_LIMIT
        ? Math.floor(total / PLAYLIST_LIMIT) + 1
        : total / PLAYLIST_LIMIT,
  };
};

export const convertPlaylistDetail = async (res: AxiosResponse) => {
  const {
    id,
    name,
    creator,
    trackIds,
    coverImgUrl,
    createTime,
    trackCount,
    playCount,
    subscribedCount,
    shareCount,
    commentCount,
    tags,
    description,
  } = res.data.playlist;
  const { userId, nickname, avatarUrl } = creator;
  const ids = trackIds.map((track: any) => track.id).join(",");
  const { data } = await getSongsData(ids);
  const convertSongs = data.songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    alias: song.alia.length ? song.alia.join("/") : "",
    artists: song.ar.map((item: Artist) => ({ id: item.id, name: item.name })),
    album: { id: song.al.id, name: song.al.name },
    sq: song.st === 0,
    durationStr: formatDuration(song.dt),
    mvId: song.mv,
  }));

  return {
    id,
    name,
    coverImgUrl,
    userId,
    nickname,
    avatarUrl,
    tags: tags.join(" / "),
    songs: convertSongs,
    trackCount,
    commentCount,
    playCount: translateCount(playCount),
    subscribedCount: translateCount(subscribedCount),
    shareCount: translateCount(shareCount),
    createTime: formatDate(createTime, "YYYY-MM-dd"),
    subDescription: description?.split("\n")[0] || "",
    description: description?.split("\n").slice(1).join("<br/>") || "",
  };
};
