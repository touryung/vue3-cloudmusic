import { PLAYLIST_LIMIT, COMMENT_LIMIT } from "@/utils/constant";
import { convertComment } from "../convertComment";
import { getRequest } from "../request";
import {
  convertCategory,
  convertPlaylists,
  convertPlaylistDetail,
} from "./convert";

const REQUEST_URL = {
  hotCategory: "/playlist/hot",
  allCategory: "/playlist/catlist",
  highQuality: "/top/playlist/highquality",
  playlist: "/top/playlist",

  detail: "/playlist/detail",
  comment: "/comment/playlist",
  songDetail: "/song/detail",
};

export interface PlaylistDetail {
  id: number;
  name: string;
  coverImgUrl: string;
  userId: number;
  nickname: string;
  avatarUrl: string;
  tags: string;
  playCount: number | string;
  subscribedCount: number | string;
  shareCount: number | string;
  trackCount: number;
  commentCount: number;
  createTime: string;
  subDescription: string;
  description: string;
  songs: Song[];
}

export const getHotCategoryData = () => {
  return getRequest(REQUEST_URL.hotCategory).then(convertCategory);
};

export const getAllCategoryData = () => {
  return getRequest(REQUEST_URL.allCategory).then(convertCategory);
};

export const getHighQualityData = (category: string) => {
  return getRequest(REQUEST_URL.highQuality, { cat: category }).then(
    convertPlaylists
  );
};

export const getPlaylistData = (category: string, currentPage: number) => {
  return getRequest(REQUEST_URL.playlist, {
    cat: category,
    limit: PLAYLIST_LIMIT,
    offset: (currentPage - 1) * COMMENT_LIMIT,
  }).then(convertPlaylists);
};

export const getPlaylistDetailData = (id: number) => {
  return getRequest(REQUEST_URL.detail, { id }).then(convertPlaylistDetail);
};

export const getPlaylistCommentData = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.comment, {
    id,
    limit: COMMENT_LIMIT,
    offset: (currentPage - 1) * COMMENT_LIMIT,
  }).then(convertComment);
};

export const getSongsData = (ids: string) => {
  return getRequest(REQUEST_URL.songDetail, { ids });
};
