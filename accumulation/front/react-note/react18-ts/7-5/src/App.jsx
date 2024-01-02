import React, { useState } from "react";
import { useImmer } from "use-immer";

const App = () => {
  const [name, setName] = useState("");
  const [person, setPerson] = useImmer([
    { id: 0, name: "老王", checked: false },
  ]);

  // 数组添加元素
  const add = () => {
    setPerson([...person, { id: person.length, name: name, checked: false }]);
  };

  // 数组删除元素
  const handleDelete = (item) => {
    setPerson(person.filter((i) => i.id !== item.id));
  };

  // 是否选中
  const handleCheck = (check, id) => {
    setPerson((draft) => {
      const checkItem = draft.find((i) => i.id === id);
      checkItem.checked = check;
    });
  };

  return (
    <>
      <h1>小滴课堂的员工列表</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={add}>添加</button>
      <ul>
        {person.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => handleCheck(e.target.checked, item.id)}
              />
            </label>
            {item.name} <button onClick={() => handleDelete(item)}>删除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
