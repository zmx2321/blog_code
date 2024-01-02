import React, { useEffect, useState } from "react";
import { root } from "./main";

const App = () => {
  const [counte, setCounte] = useState(0);
  const [name, setName] = useState("小滴课堂");
  // 增加
  const add = () => {
    setCounte((counte) => counte + 1);
  };

  // 改变
  const change = () => {
    setName("xdclass.net");
  };

  // 卸载组件
  const handelDelete = () => {
    root.unmount();
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setCounte((counte) => counte + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      console.log("组件卸载了");
    };
  }, []);

  return (
    <div>
      <h1>当前的计数：{counte}</h1>
      <button onClick={add}>增加</button>
      <h1>{name}</h1>
      <button onClick={change}>改变</button>
      <button onClick={handelDelete}>卸载组件</button>
    </div>
  );
};

export default App;
