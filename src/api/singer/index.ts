import { convertSingerList } from "./convert";
import { getRequest } from "../request";
import { SINGER_LIMIT } from "@/utils/constant";

const REQUEST_URL = {
  singerList: "/artist/list",
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
