import React, { useState } from "react";

const App = () => {
  const [counte, setCounte] = useState(0);
  const [title, setTitle] = useState("小滴课堂");

  const add = () => {
    // setCounte(counte + 1);
    setCounte((counte) => {
      counte++;
      console.log("更新后的值:", counte);
      return counte;
    });
  };

  const changeName = () => {
    setTitle("xdclass.net");
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>当前的计数：{counte}</div>
      <button onClick={add}>增加</button>
      <button onClick={changeName}>更改title</button>
    </div>
  );
};
export default App;
