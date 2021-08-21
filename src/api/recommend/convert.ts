import { AxiosResponse } from "axios";
import { translateCount, formatDuration } from "@/utils/utils";

export const convertBanners = (res: AxiosResponse) => {
  return res.data.banners.map((banner: any) => banner.imageUrl);
};

export const convertPlaylists = (res: AxiosResponse) => {
  return res.data.result.map((playlistItem: any) => {
    return {
      id: playlistItem.id,
      name: playlistItem.name,
      picUrl: playlistItem.picUrl,
      playCount: translateCount(playlistItem.playCount),
    };
  });
};

export const convertOwnersend = (res: AxiosResponse) => {
  return res.data.result.map((ownersend: any) => {
    return {
      id: ownersend.id,
      name: ownersend.name,
      picUrl: ownersend.picUrl,
    };
  });
};

export const convertNewMusic = (res: AxiosResponse) => {
  return res.data.result.map((newMusic: any) => {
    const { song } = newMusic;
    const { album, artists, duration } = song;
    return {
      id: newMusic.id,
      name: newMusic.name,
      picUrl: newMusic.picUrl,
      alias: album.alias.join("/") || "",
      mvId: song.mvid,
      album: { id: album.id, name: album.name },
      artists: artists.map((newMusic: Artist) => ({
        id: newMusic.id,
        name: newMusic.name,
      })),
      duration: duration,
      durationStr: formatDuration(duration),
      sq: album.status === 0,
    };
  });
};

export const convertMvlist = (res: AxiosResponse) => {
  return res.data.result.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      duration: item.duration,
      artistId: item.artistId,
      artistName: item.artistName,
      playCount: translateCount(item.playCount),
    };
  });
};
