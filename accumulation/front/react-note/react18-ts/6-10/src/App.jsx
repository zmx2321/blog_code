import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./store/modules/counterSlice";
import Test from "./components/Test";

export default function Person() {
  // 拿到store里的数据/状态
  const { value, list } = useSelector((state) => state.counter);

  // 通过dispatch调用store的方法
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Person -- {value}</h2>
      <h2>list -- {list.length}</h2>
      <button onClick={() => dispatch(increment())}>增加</button>
      <button onClick={() => dispatch(decrement())}>减少</button>
      <hr />
      <Test />
    </div>
  );
}
