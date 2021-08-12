import { getRequest } from "../request";
import {
  convertBanners,
  convertPlaylists,
  convertOwnersend,
  convertNewMusic,
  convertMvlist,
} from "./convert";

const REQUEST_URL = {
  banners: "/banner",
  playlist: "/personalized",
  ownersend: "/personalized/privatecontent",
  newMusic: "/personalized/newsong",
  mv: "/personalized/mv",
};

export const getBannersData = () => {
  return getRequest(REQUEST_URL.banners).then(convertBanners);
};

export const getPlaylistData = () => {
  return getRequest(REQUEST_URL.playlist, { limit: 10 }).then(convertPlaylists);
};

export const getOwnersendData = () => {
  return getRequest(REQUEST_URL.ownersend).then(convertOwnersend);
};

export const getNewmusicData = () => {
  return getRequest(REQUEST_URL.newMusic, { limit: 12 }).then(convertNewMusic);
};

export const getMvlistData = () => {
  return getRequest(REQUEST_URL.mv).then(convertMvlist);
};
