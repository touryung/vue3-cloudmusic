import { COMMENT_LIMIT } from "@/utils/constant";
import { convertLyrics, convertSimiSongs } from "./convert";
import { getRequest } from "../request";
import { convertComment } from "../convertComment";

const REQUEST_URL = {
  songLyric: "/lyric",
  songComment: "/comment/music",
  simiSong: "/simi/song",
};

export const getSongLyricsData = (id: number) => {
  return getRequest(REQUEST_URL.songLyric, { id }).then(convertLyrics);
};

export const getSongCommentInfoData = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.songComment, {
    id,
    limit: COMMENT_LIMIT,
    offset: (currentPage - 1) * COMMENT_LIMIT,
  }).then(convertComment);
};

export const getSimiSongs = (id: number) => {
  return getRequest(REQUEST_URL.simiSong, { id }).then(convertSimiSongs);
};
