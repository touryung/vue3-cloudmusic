import { formatDuration } from "@/utils/utils";
import { AxiosResponse } from "axios";

export const convertLyrics = (res: AxiosResponse) => {
  const { lrc } = res.data;
  if (!lrc) return [{ time: 0, text: "纯音乐请欣赏......" }];

  const { lyric } = lrc;
  return lyric
    .split("\n")
    .map((line: string) => {
      if (line && line.split("]")[1]) {
        return {
          time: computedTime(line.split("]")[0].slice(1)),
          text: line.split("]")[1].trim(),
        };
      }
    })
    .filter(Boolean);
};

export const convertSimiSongs = (res: AxiosResponse) => {
  const { songs } = res.data;
  return songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.album.picUrl,
    alias: song.album.length ? song.alias.join("/") : "",
    artists: song.artists.map((item: Artist) => ({
      id: item.id,
      name: item.name,
    })),
    album: { id: song.album.id, name: song.album.name },
    sq: song.status === 0,
    duration: song.duration,
    durationStr: formatDuration(song.duration),
    mvId: song.mvid,
  }));
};

const computedTime = (timeStr: string) => {
  const min = parseInt(timeStr.slice(0, 2));
  const sec = parseInt(timeStr.slice(3, 7));
  return min * 60 + sec;
};
