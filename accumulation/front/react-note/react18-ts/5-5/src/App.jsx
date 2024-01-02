import React from "react";
class App extends React.Component {
  state = {
    list: [
      { id: 1, name: "冰冰", hobby: "喝奶茶" },
      { id: 2, name: "anna", hobby: "逛街" },
      { id: 3, name: "老帆", hobby: "打篮球" },
    ],
  };

  addClick = () => {
    const item = { id: 4, name: "老王", hobby: "按摩" };
    this.setState({ list: [item, ...this.state.list] });
  };

  // 一.使用index作为key值
  // 初始数据
  // { id:1,name: "冰冰", hobby: "喝奶茶" },
  // { id:2,name: "anna", hobby: "逛街" },
  // { id:3,name: "老帆", hobby: "打篮球" },

  // 初始虚拟dom
  // <li key=0>名字：冰冰，爱好：喝奶茶</li>
  // <li key=1>名字：anna，爱好：逛街</li>
  // <li key=2>名字：老帆，爱好：打篮球</li>

  // 更新后的数据
  // { id:4,name: "老王", hobby: "按摩" },
  // { id:1,name: "冰冰", hobby: "喝奶茶" },
  // { id:2,name: "anna", hobby: "逛街" },
  // { id:3,name: "老帆", hobby: "打篮球" },

  // 更新后的虚拟dom
  // <li key=0>名字：老王，爱好：喝奶茶</li>
  // <li key=1>名字：冰冰，爱好：喝奶茶</li>
  // <li key=2>名字：anna，爱好：逛街</li>
  // <li key=3>名字：老帆，爱好：打篮球</li>

  // 二.使用唯一值id作为key值
  // 初始数据
  // {id:1, name: "冰冰", hobby: "喝奶茶" },
  // {id:2,name: "anna", hobby: "逛街" },
  // {id:3, name: "老帆", hobby: "打篮球" },

  // 初始虚拟dom
  // <li key=1>名字：冰冰，爱好：喝奶茶</li>
  // <li key=2>名字：anna，爱好：逛街</li>
  // <li key=3>名字：老帆，爱好：打篮球</li>

  // 更新后的数据
  // {id:4, name: "老王", hobby: "按摩" },
  // {id:1, name: "冰冰", hobby: "喝奶茶" },
  // {id:2, name: "anna", hobby: "逛街" },
  // {id:3, name: "老帆", hobby: "打篮球" },

  // 更新后的虚拟dom
  // <li key=4>名字：老王，爱好：喝奶茶</li>
  // <li key=1>名字：冰冰，爱好：喝奶茶</li>
  // <li key=2>名字：anna，爱好：逛街</li>
  // <li key=3>名字：老帆，爱好：打篮球</li>

  render() {
    return (
      <>
        <h1>小滴课堂人员列表</h1>
        <input type="text" />
        <ul>
          {this.state.list.map((item) => {
            return (
              <li key={item.id}>
                名字：{item.name}，爱好：{item.hobby}
              </li>
            );
          })}
        </ul>
        <button onClick={this.addClick}>添加人员按钮</button>
      </>
    );
  }
}
export default App;
