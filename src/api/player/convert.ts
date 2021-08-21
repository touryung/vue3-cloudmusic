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

const computedTime = (timeStr: string) => {
  const min = parseInt(timeStr.slice(0, 2));
  const sec = parseInt(timeStr.slice(3, 7));
  return min * 60 + sec;
};
