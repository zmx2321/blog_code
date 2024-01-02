import React from "react";
import { useSearchParams } from "react-router-dom";
const Classify = () => {
  const [search, setSearch] = useSearchParams();
  const xd = search.get("xd");
  const website = search.get("website");

  return (
    <div>
      分类的页面
      <div>
        父组件home传递的参数：{xd}-{website}
      </div>
      <button onClick={() => setSearch("xd=老王&website=laowang.com")}>
        点击更改参数
      </button>
    </div>
  );
};
export default Classify;
