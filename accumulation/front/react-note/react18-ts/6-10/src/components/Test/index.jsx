import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Test = () => {
  // 拿到store里的数据/状态
  const { value, list } = useSelector((state) => state.counter);
  return (
    <div>
      测试的组件：{value},{list.length}
    </div>
  );
};

export default Test;
