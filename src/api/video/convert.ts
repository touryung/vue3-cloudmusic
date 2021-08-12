import { MVLIST_LIMIT } from "@/utils/constant";
import { formatDuration, translateCount } from "@/utils/utils";
import { AxiosResponse } from "axios";

export const convertMvlist = (res: AxiosResponse) => {
  const { data, count } = res.data;
  if (!data || !data.length) return;

  const mvs: Mv[] = data.map((mv: Mv) => ({
    id: mv.id,
    name: mv.name,
    picUrl: mv.cover,
    artistId: mv.artistId,
    artistName: mv.artistName,
    durationStr: formatDuration(mv.duration),
    playCount: translateCount(mv.playCount),
  }));

  const total = count || 0;
  return {
    mvs,
    total,
    pageCount:
      total % MVLIST_LIMIT
        ? Math.floor(total / MVLIST_LIMIT) + 1
        : total / MVLIST_LIMIT,
  };
};
