import { convertSearchSuggest } from "./convert";
import { getRequest } from "@/api/request";

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
