import { COMMENT_LIMIT, MVLIST_LIMIT } from "@/utils/constant";
import { convertComment } from "../convertComment";
import { getRequest } from "../request";
import {
  convertMvDetail,
  convertMvlist,
  convertRelatedVideo,
  convertVideoDetail,
} from "./convert";

const REQUEST_URL = {
  mvList: "/mv/all",
  related: "/related/allvideo",

  mvDetail: "/mv/detail",
  mvZan: "/mv/detail/info",
  mvUrl: "/mv/url",
  mvComment: "/comment/mv",

  videoDetail: "/video/detail",
  videoZan: "/video/detail/info",
  videoUrl: "/video/url",
  videoComment: "/comment/video",
};

export const getMvListData = (
  area: string,
  type: string,
  order: string,
  currentPage: number
) => {
  return getRequest(REQUEST_URL.mvList, {
    area,
    type,
    order,
    limit: MVLIST_LIMIT,
    offset: (currentPage - 1) * MVLIST_LIMIT,
  }).then(convertMvlist);
};

export const getMvDetailData = (id: string) => {
  return getRequest(REQUEST_URL.mvDetail, { mvid: id }).then(convertMvDetail);
};

export const getVideoDetailData = (id: string) => {
  return getRequest(REQUEST_URL.videoDetail, { id }).then(convertVideoDetail);
};

export const getMvZanData = (id: string) => {
  return getRequest(REQUEST_URL.mvZan, { mvid: id });
};

export const getVideoZanData = (id: string) => {
  return getRequest(REQUEST_URL.videoZan, { vid: id });
};

export const getMvUrlData = (id: string) => {
  return getRequest(REQUEST_URL.mvUrl, { id });
};

export const getVideoUrlData = (id: string) => {
  return getRequest(REQUEST_URL.videoUrl, { id });
};

export const getMvCommentData = (id: string, currentPage: number) => {
  return getRequest(REQUEST_URL.mvComment, {
    id,
    limit: COMMENT_LIMIT,
    offset: (currentPage - 1) * COMMENT_LIMIT,
  }).then(convertComment);
};

export const getVideoCommentData = (id: string, currentPage: number) => {
  return getRequest(REQUEST_URL.videoComment, {
    id,
    limit: COMMENT_LIMIT,
    offset: (currentPage - 1) * COMMENT_LIMIT,
  }).then(convertComment);
};

export const getRelatedVideoData = (id: string) => {
  return getRequest(REQUEST_URL.related, { id }).then(convertRelatedVideo);
};
