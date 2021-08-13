import { formatDate, formatDuration, translateCount } from "@/utils/utils";
import { AxiosResponse } from "axios";

export const convertSingerList = (res: AxiosResponse) => {
  const { artists, more } = res.data;
  const ars = artists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    picUrl: artist.img1v1Url,
  }));

  return {
    singers: ars,
    more,
  };
};

export const convertSingerInfo = (res: AxiosResponse) => {
  const { artist, hotSongs } = res.data;

  const singerInfo = {
    id: artist.id,
    name: artist.name,
    alias: artist.alias.length ? artist.alias.join("/") : "",
    picUrl: artist.img1v1Url,
    musicSize: artist.musicSize,
    albumSize: artist.albumSize,
    mvSize: artist.mvSize,
  };

  const top50 = hotSongs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    alias: song.alia.length ? song.alia.join("/") : "",
    artists: song.ar.map((item: Artist) => ({ id: item.id, name: item.name })),
    album: { id: song.al.id, name: song.al.name },
    sq: song.st === 1,
    durationStr: formatDuration(song.dt),
    mvId: song.mv,
  }));

  return {
    singerInfo,
    top50,
  };
};

export const convertSingerAlbums = (res: AxiosResponse) => {
  const { hotAlbums, more } = res.data;

  const convertAlbums = hotAlbums.map((album: any) => ({
    id: album.id,
    name: album.name,
    picUrl: album.picUrl,
    publishTime: formatDate(album.publishTime, "YYYY-MM-dd"),
  }));

  return { albums: convertAlbums, more };
};

export const convertAlbumSongs = (res: AxiosResponse) => {
  const { songs } = res.data;

  return songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    alias: song.alia.length ? song.alia.join("/") : "",
    artists: song.ar.map((item: Artist) => ({ id: item.id, name: item.name })),
    album: { id: song.al.id, name: song.al.name },
    sq: song.st === 1,
    durationStr: formatDuration(song.dt),
    mvId: song.mv,
  }));
};

export const convertSingerMvs = (res: AxiosResponse) => {
  const { mvs } = res.data;
  if (!mvs || !mvs.length) return;

  return mvs.map((mv: any) => ({
    id: mv.id,
    name: mv.name,
    picUrl: mv.imgurl16v9,
    durationStr: formatDuration(mv.duration),
    playCount: translateCount(mv.playCount),
  }));
};

export const convertSingerDesc = (res: AxiosResponse) => {
  const { introduction, briefDesc } = res.data;

  if (!introduction || !introduction.length) {
    return [{ title: "歌手简介", textArr: [briefDesc] }];
  }

  return introduction.map((desc: any) => ({
    title: desc.ti,
    textArr: desc.txt.split("\n"),
  }));
};

export const convertSimiSinger = (res: AxiosResponse) => {
  const { artists } = res.data;
  if (!artists || !artists.length) return;

  return artists.map((item: any) => ({
    id: item.id,
    name: item.name,
    picUrl: item.img1v1Url,
  }));
};
