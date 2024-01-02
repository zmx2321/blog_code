import React from "react";
import { useParams } from "react-router-dom";
const Classify = () => {
  const params = useParams();
  return (
    <div>
      分类的页面
      <div>父组件home传递的参数：{params.xd}</div>
    </div>
  );
};
export default Classify;
