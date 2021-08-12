// 歌单数量
export const PLAYLIST_LIMIT = 100;
// 评论数量
export const COMMENT_LIMIT = 60;
// 歌手数量
export const SINGER_LIMIT = 60;
// MV 数量
export const MVLIST_LIMIT = 105;

// 歌手区域
export const SINGER_AREAS: Array<SingerSelectArgs> = [
  { label: "全部", value: -1 },
  { label: "华语", value: 7 },
  { label: "欧美", value: 96 },
  { label: "日本", value: 8 },
  { label: "韩国", value: 16 },
  { label: "其他", value: 0 },
];

// 歌手类型
export const SINGER_TYPES: Array<SingerSelectArgs> = [
  { label: "全部", value: -1 },
  { label: "男歌手", value: 1 },
  { label: "女歌手", value: 2 },
  { label: "乐队组合", value: 3 },
];

// 歌手首字母
export const ALPHA_TYPES: Array<SingerSelectArgs> = [
  { label: "热门", value: "" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
  { label: "I", value: "I" },
  { label: "J", value: "J" },
  { label: "K", value: "K" },
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "N", value: "N" },
  { label: "O", value: "O" },
  { label: "P", value: "P" },
  { label: "Q", value: "Q" },
  { label: "R", value: "R" },
  { label: "S", value: "S" },
  { label: "T", value: "T" },
  { label: "U", value: "U" },
  { label: "V", value: "V" },
  { label: "W", value: "W" },
  { label: "X", value: "X" },
  { label: "Y", value: "Y" },
  { label: "Z", value: "Z" },
  { label: "#", value: 0 },
];

export const NEW_CATEGORYS = [
  { label: "全部", value: 0 },
  { label: "华语", value: 7 },
  { label: "欧美", value: 96 },
  { label: "韩国", value: 16 },
  { label: "日本", value: 8 },
];

export const MV_AREAS = [
  { label: "全部", value: "全部" },
  { label: "内地", value: "内地" },
  { label: "港台", value: "港台" },
  { label: "欧美", value: "欧美" },
  { label: "韩国", value: "韩国" },
  { label: "日本", value: "日本" },
];

export const MV_TYPES = [
  { label: "全部", value: "全部" },
  { label: "官方版", value: "官方版" },
  { label: "原声", value: "原声" },
  { label: "现场版", value: "现场版" },
  { label: "网易出品", value: "网易出品" },
];

export const MV_ORDERS = [
  { label: "上升最快", value: "上升最快" },
  { label: "最新", value: "最新" },
  { label: "最热", value: "最热" },
];
