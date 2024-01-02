import React from "react";

class App extends React.Component {
  popClick = () => {
    const { inputRef } = this.refs;
    console.log(inputRef.value);
  };

  render() {
    return (
      <>
        <input type="text" placeholder="请输入内容" ref="inputRef" />
        <button onClick={this.popClick}>点击获取input内容</button>
      </>
    );
  }
}
export default App;
