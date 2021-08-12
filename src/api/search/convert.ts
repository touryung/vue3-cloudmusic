import { AxiosResponse } from "axios";

// 将 API 返回数据转化成需要的格式
export const convertSearchSuggest = (res: AxiosResponse) => {
  const { result } = res.data;
  if (!result) return;
  let { songs, albums, artists, playlists } = result;

  if (songs && songs.length) {
    songs = songs.map((song) => ({
      id: song.id,
      name: song.name,
      artist: song.artists.map((item) => item.name).join(" "),
    }));
  }

  if (albums && albums.length) {
    albums = albums.map((album) => ({
      id: album.id,
      name: album.name,
      artist: album.artist.name || "",
    }));
  }

  if (artists && artists.length) {
    artists = artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    }));
  }

  if (playlists && playlists.length) {
    playlists = playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
    }));
  }

  return {
    songs: songs || [],
    albums: albums || [],
    artists: artists || [],
    playlists: playlists || [],
  };
};
