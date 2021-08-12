import { AxiosResponse } from "axios";

export const convertSingerList = (res: AxiosResponse) => {
  const { artists, more } = res.data;
  const ars = artists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    picUrl: artist.img1v1Url,
  }));

  return {
    singers: ars,
    more,
  };
};
