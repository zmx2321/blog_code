import React from "react";
import { useImmer } from "use-immer";

const App = () => {
  const [message, setMessage] = useImmer({
    name: "小滴课堂",
    website: "xdclass.net",
    staff: {
      name: "老王",
      hobby: "按摩",
    },
  });

  // 更改简单对象属性
  const changeName = () => {
    setMessage((draft) => {
      draft.name = "广州小滴科技";
    });
  };

  // 更改嵌套对象属性
  const changeHobby = () => {
    setMessage((draft) => {
      draft.staff.hobby = "洗脚";
    });
  };

  return (
    <div>
      <h1>
        公司的信息：{message.name}--{message.website}
      </h1>
      <h3>
        员工的信息：{message.staff.name}--{message.staff.hobby}
      </h3>
      <button onClick={changeName}>更改title</button>
      <button onClick={changeHobby}>更改hobby</button>
    </div>
  );
};
export default App;
