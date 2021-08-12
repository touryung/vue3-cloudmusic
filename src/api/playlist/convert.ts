import { formatDate, formatDuration, translateCount } from "@/utils/utils";
import { COMMENT_LIMIT, PLAYLIST_LIMIT } from "@/utils/constant";
import { AxiosResponse } from "axios";
import { getSongsData } from "../common";

export const convertCategory = (res: AxiosResponse) => {
  return res.data;
};

// 转换歌单内容
export const convertPlaylists = (res: AxiosResponse) => {
  const { playlists, total } = res.data;
  const convertPlaylists: PlayListItem[] = playlists.map((list) => ({
    id: list.id,
    name: list.name,
    picUrl: list.coverImgUrl,
    playCount: translateCount(list.playCount),
    nickName: list.creator.nickname,
    copywriter: list.copywriter || "",
    tag: list.tag || "",
  }));

  return {
    playlists: convertPlaylists,
    pageCount:
      total % PLAYLIST_LIMIT
        ? Math.floor(total / PLAYLIST_LIMIT) + 1
        : total / PLAYLIST_LIMIT,
  };
};

export const convertPlaylistDetail = async (res: AxiosResponse) => {
  const {
    id,
    name,
    creator,
    trackIds,
    coverImgUrl,
    createTime,
    trackCount,
    playCount,
    subscribedCount,
    shareCount,
    commentCount,
    tags,
    description,
  } = res.data.playlist;
  const { userId, nickname, avatarUrl } = creator;
  const ids = trackIds.map((track: any) => track.id).join(",");
  const { data } = await getSongsData(ids);
  const convertSongs = data.songs.map((song: any) => ({
    id: song.id,
    name: song.name,
    picUrl: song.al.picUrl,
    alias: song.alia.length ? song.alia.join("/") : "",
    artists: song.ar.map((item: Artist) => ({ id: item.id, name: item.name })),
    album: { id: song.al.id, name: song.al.name },
    sq: song.st === 0,
    duration: song.dt,
    durationStr: formatDuration(song.dt),
    mvId: song.mv,
  }));

  return {
    id,
    name,
    coverImgUrl,
    userId,
    nickname,
    avatarUrl,
    tags: tags.join(" / "),
    songs: convertSongs,
    trackCount,
    commentCount,
    playCount: translateCount(playCount),
    subscribedCount: translateCount(subscribedCount),
    shareCount: translateCount(shareCount),
    createTime: formatDate(createTime, "YYYY-MM-dd"),
    subDescription: description?.split("\n")[0] || "",
    description: description?.split("\n").slice(1).join("<br/>") || "",
  };
};

export const convertPlaylistComment = (res: AxiosResponse) => {
  let { hotComments, comments } = res.data;
  const { total } = res.data;

  // 转换热门评论
  if (hotComments && hotComments.length > 0) {
    hotComments = hotComments.map((comment: any) => {
      let beReplied: CommentReplied[] = [];
      // 转换当前热门评论回复
      if (comment.beReplied.length > 0) {
        beReplied = comment.beReplied.map((item: any) => ({
          id: item.user.userId,
          name: item.user.nickname,
          commentId: item.commentId,
          avatarUrl: item.user.avatarUrl,
          time: formatDate(item.time, "YYYY年MM月dd日 hh:mm"),
          likedCount: item.likedCount,
          content: item.content,
        }));
      }

      return {
        id: comment.user.userId,
        name: comment.user.nickname,
        commentId: comment.commentId,
        avatarUrl: comment.user.avatarUrl,
        time: formatDate(comment.time, "YYYY年MM月dd日 hh:mm"),
        likedCount: comment.likedCount,
        content: comment.content,
        beReplied,
      };
    });
  }
  // 转换普通评论
  comments = comments.map((comment: any) => {
    let beReplied: CommentReplied[] = [];
    // 转换当前普通评论回复
    if (comment.beReplied.length > 0) {
      beReplied = comment.beReplied.map((item: any) => ({
        id: item.user.userId,
        name: item.user.nickname,
        commentId: item.commentId,
        avatarUrl: item.user.avatarUrl,
        time: formatDate(item.time, "YYYY年MM月dd日 hh:mm"),
        likedCount: item.likedCount,
        content: item.content,
      }));
    }

    return {
      id: comment.user.userId,
      name: comment.user.nickname,
      commentId: comment.commentId,
      avatarUrl: comment.user.avatarUrl,
      time: formatDate(comment.time, "YYYY年MM月dd日 hh:mm"),
      likedCount: comment.likedCount,
      content: comment.content,
      beReplied,
    };
  });

  return {
    hotComments: hotComments || [],
    comments,
    total,
    pageCount:
      total % COMMENT_LIMIT
        ? Math.floor(total / COMMENT_LIMIT) + 1
        : total / COMMENT_LIMIT,
  };
};
