import React from "react";
import { useLocation } from "react-router-dom";
const Classify = () => {
  const {
    state: { xd, website },
  } = useLocation();

  return (
    <div>
      分类的页面
      <div>
        父组件home传递的参数：{xd}-{website}
      </div>
    </div>
  );
};
export default Classify;
