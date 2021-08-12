import { getHotSearchList } from "@/api/search/index";
import { onMounted, ref } from "vue";

interface HotList {
  searchWord: string;
  score: number;
  content: string;
  iconUrl: string;
  [property: string]: any;
}

export default function useHotSearch(keywords, isFocused, router) {
  const hotSearchList = ref<HotList[]>([]);

  // 热搜项点击事件
  const handleClickHotItem = (searchWord: string) => {
    keywords.value = searchWord;
    isFocused = false;
    router.push(`/search/${keywords.value}`);
  };

  const renderHotSearchList = () => (
    <div class="hot-list">
      <h1 class="title">热搜榜</h1>
      <ul>
        {hotSearchList.value.map((item, index) => {
          return (
            <li
              class="list-item"
              onClick={() => handleClickHotItem(item.searchWord)}
            >
              <div class={`index ${index < 3 ? "red" : ""}`}>{index + 1}</div>
              <div class="desc">
                <div class="header">
                  <span class={`word ${index < 3 ? "bold" : ""}`}>
                    {item.searchWord}
                  </span>
                  {item.iconUrl ? <img src={item.iconUrl} /> : null}
                  <span class="score">{item.score}</span>
                </div>
                <div class="content">{item.content}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // 获取热搜数据
  const getHotSearchListData = async () => {
    const {
      data: { data },
    } = await getHotSearchList();
    hotSearchList.value = data;
  };

  onMounted(() => getHotSearchListData());

  return {
    renderHotSearchList,
  };
}
