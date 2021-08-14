import { MVLIST_LIMIT } from "@/utils/constant";
import { formatDate, formatDuration, translateCount } from "@/utils/utils";
import { AxiosResponse } from "axios";
import {
  getMvUrlData,
  getMvZanData,
  getVideoUrlData,
  getVideoZanData,
} from ".";
import { getSingerInfoData } from "../singer";

export const convertMvlist = (res: AxiosResponse) => {
  const { data, count } = res.data;
  if (!data || !data.length) return;

  const mvs: Mv[] = data.map((mv: Mv) => ({
    id: mv.id,
    name: mv.name,
    picUrl: mv.cover,
    artistId: mv.artistId,
    artistName: mv.artistName,
    durationStr: formatDuration(mv.duration),
    playCount: translateCount(mv.playCount),
  }));

  const total = count || 0;
  return {
    mvs,
    total,
    pageCount:
      total % MVLIST_LIMIT
        ? Math.floor(total / MVLIST_LIMIT) + 1
        : total / MVLIST_LIMIT,
  };
};

export const convertMvDetail = async (res: AxiosResponse) => {
  const { data } = res.data;
  if (!data) return;

  const { singerInfo } = await getSingerInfoData(data.artistId);
  const {
    data: { likedCount },
  } = await getMvZanData(data.id);
  const {
    data: {
      data: { url },
    },
  } = await getMvUrlData(data.id);

  return {
    id: data.id,
    name: data.name,
    url,
    likedCount,
    avatarUrl: singerInfo.picUrl,
    creatorName: data.artistName,
    posterUrl: data.cover,
    publishTime: data.publishTime,
    subCount: data.subCount,
    shareCount: data.shareCount,
    playCount: translateCount(data.playCount),
    desc: data.desc || "",
    videoGroup: data.videoGroup,
  };
};

export const convertVideoDetail = async (res: AxiosResponse) => {
  const { data } = res.data;
  if (!data) return;

  const {
    data: { likedCount },
  } = await getVideoZanData(data.vid);
  const {
    data: { urls },
  } = await getVideoUrlData(data.vid);

  return {
    id: data.vid,
    name: data.title,
    url: urls[0].url,
    likedCount,
    avatarUrl: data.creator.avatarUrl,
    creatorName: data.creator.nickname,
    posterUrl: data.coverUrl,
    publishTime: formatDate(data.publishTime, "YYYY-MM-dd"),
    subCount: data.subscribeCount,
    shareCount: data.shareCount,
    playCount: translateCount(data.playTime),
    desc: data.description || "",
    videoGroup: data.videoGroup,
  };
};

export const convertRelatedVideo = (res: AxiosResponse) => {
  const { data } = res.data;
  if (!data || !data.length) return;

  return data.map((video: any) => ({
    id: video.vid,
    title: video.title,
    creator: video.creator[0].userName,
    coverUrl: video.coverUrl,
    playCount: translateCount(video.playTime),
    durationStr: formatDuration(video.durationms),
  }));
};
