import { MVLIST_LIMIT } from "@/utils/constant";
import { getRequest } from "../request";
import { convertMvlist } from "./convert";

const REQUEST_URL = {
  mvList: "/mv/all",
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
