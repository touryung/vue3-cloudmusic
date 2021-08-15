import { SEARCH_TYPE } from "@/utils/constant";
import { convertSearchInfo, convertSearchSuggest } from "./convert";
import { getRequest } from "@/api/request";
import { AxiosResponse } from "axios";

const REQUEST_URL = {
  hotSearch: "/search/hot/detail",
  searchSuggest: "/search/suggest",
  cloudSearch: "/cloudsearch",
};

export const getHotSearchList = () => {
  return getRequest(REQUEST_URL.hotSearch);
};

export const getSearchSuggest = (keywords: string) => {
  return getRequest(REQUEST_URL.searchSuggest, { keywords }).then(
    convertSearchSuggest
  );
};

export const getSearchInfoData = (
  keywords: string,
  type: string,
  currentPage: number
) => {
  return getRequest(REQUEST_URL.cloudSearch, {
    keywords,
    type: SEARCH_TYPE[type].type,
    limit: SEARCH_TYPE[type].limit,
    offset: (currentPage - 1) * SEARCH_TYPE[type].limit,
  }).then((res: AxiosResponse<any>) => convertSearchInfo(res, type));
};
