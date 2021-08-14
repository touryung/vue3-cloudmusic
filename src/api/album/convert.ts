import { formatDate, formatDuration, translateCount } from "@/utils/utils";
import { AxiosResponse } from "axios";
import { getAlbumAllCount } from "./index";

export const convertAlbumDetail = async (res: AxiosResponse) => {
  const { songs, album } = res.data;
  const convertSongs: Song[] = songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    alias: song.alia.length ? song.alia.join("/") : "",
    artists: song.ar.map((item: Artist) => ({ id: item.id, name: item.name })),
    album: { id: song.al.id, name: song.al.name },
    sq: song.privilege.st === 0,
    durationStr: formatDuration(song.dt),
    mvId: song.mv,
  }));
  const {
    data: { shareCount, subCount },
  } = await getAlbumAllCount(album.id);

  return {
    id: album.id,
    name: album.name,
    artistId: album.artist.id,
    artistName: album.artist.name,
    publishTime: formatDate(album.publishTime, "YYYY-MM-dd"),
    subscribedCount: translateCount(subCount),
    shareCount: translateCount(shareCount),
    coverImgUrl: album.picUrl,
    description: album.description.split("\n"),
    songs: convertSongs,
  };
};
