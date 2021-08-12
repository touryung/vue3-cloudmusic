import { getSearchSuggest } from "@/api/search";
import { ref } from "vue";

export default function useCommonSearch(keywords, isFocused, router) {
  const searchList = ref({
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
  });

  const getSuggestListData = async () => {
    if (!keywords.value) return;
    searchList.value = await getSearchSuggest(keywords.value);
  };

  const handleShowDetails = (url: string) => {
    isFocused.value = false;
    router.push(url);
  };

  const renderSearchList = () => (
    <div class="search-list">
      <header class="title">
        搜"<span>{keywords.value}</span>"相关结果{">"}
      </header>
      {searchList.value.songs.length ? (
        <>
          <h1 class="sub-title">
            <i class="iconfont icon-single" />
            <span>单曲</span>
          </h1>
          {searchList.value.songs.map((song) => (
            <div class="search-item">
              {song.name} - {song.artist}
            </div>
          ))}
        </>
      ) : null}
      {searchList.value.artists.length ? (
        <>
          <h1 class="sub-title">
            <i class="iconfont icon-user" />
            <span>歌手</span>
          </h1>
          {searchList.value.artists.map((artist) => (
            <div
              class="search-item"
              onClick={() => handleShowDetails(`/singer/${artist.id}`)}
            >
              {artist.name}
            </div>
          ))}
        </>
      ) : null}
      {searchList.value.albums.length ? (
        <>
          <h1 class="sub-title">
            <i class="iconfont icon-album" />
            <span>专辑</span>
          </h1>
          {searchList.value.albums.map((album) => (
            <div
              class="search-item"
              onClick={() => handleShowDetails(`/album/${album.id}`)}
            >
              {album.name} - {album.artist}
            </div>
          ))}
        </>
      ) : null}
      {searchList.value.playlists.length ? (
        <>
          <h1 class="sub-title">
            <i class="iconfont icon-playlist" />
            <span>歌单</span>
          </h1>
          {searchList.value.playlists.map((playlist) => (
            <div
              class="search-item"
              onClick={() => handleShowDetails(`/playlist/${playlist.id}`)}
            >
              {playlist.name}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );

  return {
    getSuggestListData,
    renderSearchList,
  };
}
