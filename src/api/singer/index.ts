import {
  convertAlbumSongs,
  convertSimiSinger,
  convertSingerAlbums,
  convertSingerDesc,
  convertSingerInfo,
  convertSingerList,
  convertSingerMvs,
} from "./convert";
import { getRequest } from "../request";
import { SINGER_LIMIT, SINGER_ALBUM_LIMIT } from "@/utils/constant";

const REQUEST_URL = {
  singerList: "/artist/list",
  singerInfo: "/artists",
  singerMvs: "/artist/mv",
  singerDesc: "/artist/desc",
  simiSinger: "/simi/artist",
  singerAlbums: "/artist/album",
  albumSongs: "/album",
};

export const getSingerListData = (
  area: number,
  type: number,
  initial: string,
  currentPage: number
) => {
  return getRequest(REQUEST_URL.singerList, {
    area,
    type,
    initial,
    limit: SINGER_LIMIT,
    offset: (currentPage - 1) * SINGER_LIMIT,
  }).then(convertSingerList);
};

export const getSingerInfoData = (id: number) => {
  return getRequest(REQUEST_URL.singerInfo, { id }).then(convertSingerInfo);
};

export const getSingerAlbumsData = (id: number, currentPage: number) => {
  return getRequest(REQUEST_URL.singerAlbums, {
    id,
    limit: SINGER_ALBUM_LIMIT,
    offset: (currentPage - 1) * SINGER_ALBUM_LIMIT,
  }).then(convertSingerAlbums);
};

export const getAlbumSongsData = (id: number) => {
  return getRequest(REQUEST_URL.albumSongs, { id }).then(convertAlbumSongs);
};

export const getSingerMvsData = (id: number) => {
  return getRequest(REQUEST_URL.singerMvs, { id }).then(convertSingerMvs);
};

export const getSingerDescData = (id: number) => {
  return getRequest(REQUEST_URL.singerDesc, { id }).then(convertSingerDesc);
};

export const getSimiSingerData = (id: number) => {
  return getRequest(REQUEST_URL.simiSinger, { id }).then(convertSimiSinger);
};
