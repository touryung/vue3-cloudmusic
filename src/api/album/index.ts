import { COMMENT_LIMIT } from "@/utils/constant";
import { convertComment } from "../convertComment";
import { getRequest } from "../request";
import { convertAlbumDetail } from "./convert";

const REQUEST_URL = {
  detail: "/album",
  count: "/album/detail/dynamic",
  comment: "/comment/album",
};

export interface AlbumDetail {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  publishTime: string;
  subscribedCount: number | string;
  shareCount: number | string;
  coverImgUrl: string;
  description: any;
  songs: Song[];
}

export const getAlbumDetailData = (id: number) => {
  return getRequest(REQUEST_URL.detail, { id }).then(convertAlbumDetail);
};

export const getAlbumAllCount = (id: number) => {
  return getRequest(REQUEST_URL.count, { id });
};

export const getAlbumCommentData = (id: number, currentPage) => {
  return getRequest(REQUEST_URL.comment, {
    id,
    limit: COMMENT_LIMIT,
    offset: (currentPage - 1) * COMMENT_LIMIT,
  }).then(convertComment);
};
