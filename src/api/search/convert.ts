import { SEARCH_TYPE } from "@/utils/constant";
import { formatDuration, translateCount } from "@/utils/utils";
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

export const convertSearchInfo = (res: AxiosResponse, type: string) => {
  const { result } = res.data;

  switch (type) {
    case "songs": {
      const songs = result.songs.map((song: any) => ({
        id: song.id,
        name: song.name,
        picUrl: song.al.picUrl,
        alias: song.alia.length ? song.alia.join("/") : "",
        artists: song.ar.map((item: Artist) => ({
          id: item.id,
          name: item.name,
        })),
        album: { id: song.al.id, name: song.al.name },
        sq: song.st === 0,
        durationStr: formatDuration(song.dt),
        mvId: song.mv,
      }));
      return {
        songs,
        total: result.songCount,
        pageCount:
          result.songCount % SEARCH_TYPE[type].limit
            ? Math.floor(result.songCount / SEARCH_TYPE[type].limit) + 1
            : result.songCount / SEARCH_TYPE[type].limit,
      };
    }
    case "artists": {
      const artists: Artist[] = result.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        picUrl: artist.img1v1Url,
      }));
      return {
        artists,
        total: result.artistCount,
        pageCount:
          result.artistCount % SEARCH_TYPE[type].limit
            ? Math.floor(result.artistCount / SEARCH_TYPE[type].limit) + 1
            : result.artistCount / SEARCH_TYPE[type].limit,
      };
    }
    case "albums": {
      const albums: Album[] = result.albums.map((album: Album) => ({
        id: album.id,
        name: album.name,
        picUrl: album.picUrl,
        artist: album.artist.name,
        artistAlias: album.artist.trans
          ? album.artist.trans
          : album.artist.alias.length
          ? album.artist.alias.join("/")
          : "",
      }));
      return {
        albums,
        total: result.albumCount,
        pageCount:
          result.albumCount % SEARCH_TYPE[type].limit
            ? Math.floor(result.albumCount / SEARCH_TYPE[type].limit) + 1
            : result.albumCount / SEARCH_TYPE[type].limit,
      };
    }
    case "videos": {
      const videos = result.videos.map((video: any) => ({
        id: video.vid,
        name: video.title,
        coverUrl: video.coverUrl,
        durationStr: formatDuration(video.durationms),
        playCount: translateCount(video.playTime),
        nickName: video.creator.map((c: any) => c.userName).join("/"),
      }));
      return {
        videos,
        total: result.videoCount,
        pageCount:
          result.videoCount % SEARCH_TYPE[type].limit
            ? Math.floor(result.videoCount / SEARCH_TYPE[type].limit) + 1
            : result.videoCount / SEARCH_TYPE[type].limit,
      };
    }
    case "playlists": {
      const playlists = result.playlists.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        trackCount: playlist.trackCount,
        nickName: playlist.creator.nickname,
      }));
      return {
        playlists,
        total: result.playlistCount,
        pageCount:
          result.playlistCount % SEARCH_TYPE[type].limit
            ? Math.floor(result.playlistCount / SEARCH_TYPE[type].limit) + 1
            : result.playlistCount / SEARCH_TYPE[type].limit,
      };
    }
    default: {
      break;
    }
  }
};
