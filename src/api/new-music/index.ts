import { getRequest } from "../request";
import { convertTopSongs } from "./convert";

const REQUEST_URL = {
  topSongs: "/top/song",
};

export const getTopSongsData = (category: number) => {
  return getRequest(REQUEST_URL.topSongs, { type: category }).then(
    convertTopSongs
  );
};
