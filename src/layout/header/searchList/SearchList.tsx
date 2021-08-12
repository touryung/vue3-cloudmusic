import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "@/utils/utils";
import useCommonSearch from "@/hooks/header/useCommonSearch";
import useHotSearch from "@/hooks/header/useHotSearch";
import "./searchList.scss";

export default defineComponent({
  setup() {
    const keywords = ref<string>("");
    const isFocused = ref<boolean>(false);
    const router = useRouter();

    // 热搜和推荐的钩子
    const { renderHotSearchList } = useHotSearch(keywords, isFocused, router);
    const { getSuggestListData, renderSearchList } = useCommonSearch(
      keywords,
      isFocused,
      router
    );

    // 根据输入获取推荐数据
    const handleInputChange = debounce(() => getSuggestListData(), 300);
    watch(keywords, () => handleInputChange());

    // 根据回车跳转到详情 TODO: 中文输入法触发输入框监听问题
    const handleSearchInfoShow = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        isFocused.value = false;
        router.push(`/search/${keywords.value}`);
      }
    };

    const directive = {
      value: () => (isFocused.value = false),
      arg: "search-input",
    };

    return () => (
      <div class="search">
        <input
          type="text"
          id="search-input"
          class="search-input"
          placeholder="搜索"
          v-model={keywords.value}
          onKeyup={handleSearchInfoShow}
          onFocus={() => (isFocused.value = true)}
        />
        <i class="iconfont icon-search" />
        {isFocused.value ? (
          <div class="list-container" v-outside={directive}>
            {keywords.value ? renderSearchList() : renderHotSearchList()}
          </div>
        ) : null}
      </div>
    );
  },
});
