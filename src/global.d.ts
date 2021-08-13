interface TabItem {
  path: string;
  content: string;
}

interface PlayListItem {
  id: number;
  name: string;
  picUrl: string;
  playCount: number | string;
  nickName: string;
  copywriter?: string;
  [propName: string]: any;
}

interface OwnerSendItem {
  id: number;
  name: string;
  picUrl: string;
  [propName: string]: any;
}

interface Artist {
  id: number;
  name: string;
  picUrl?: string;
}

interface Song {
  id: number;
  name: string;
  picUrl?: string;
  alias?: string;
  artists: Artist[];
  album?: Album;
  sq?: boolean;
  durationStr?: string;
  mvId?: number;
}

interface Mv {
  id: number;
  name: string;
  picUrl: string;
  artistId: number;
  artistName?: string;
  durationStr?: string;
  playCount?: number;
  [propName: string]: any;
}

// rank
interface CommonRank {
  id: number;
  name: string;
  coverImgUrl: string;
  backgroundImgUrl: string;
  updateTime: string;
  playCount: string | number;
  songs: Song[];
}

interface SingerRank {
  coverImgUrl: string;
  backgroundImgUrl: string;
  updateTime: string;
  artists: Artist[];
}

interface SingerSelectArgs {
  label: string;
  value: number | string;
}

interface CommentReplied {
  id: number;
  name: string;
  commentId: number;
  avatarUrl: string;
  content: string;
  time: string;
  likedCount: number;
}

interface Comment {
  id: number;
  name: string;
  commentId: number;
  avatarUrl: string;
  content: string;
  time: string;
  likedCount: number;
  beReplied: CommentReplied[];
}

type Album = {
  id: number;
  name: string;
  picUrl?: string;
  songs?: Song[];
  isTop?: boolean;
  publishTime?: string;
  [propName: string]: any;
};
