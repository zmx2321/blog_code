import React from "react";

class App extends React.Component {
  state = { xd: true };

  popClick = () => {
    console.log(this.inputRef.value);
  };

  handleClick = () => {
    this.setState({ xd: !this.state.xd });
  };

  render() {
    return (
      <>
        <input
          type="text"
          placeholder="请输入内容"
          ref={(e) => (this.inputRef = e)}
        />
        <button onClick={this.popClick}>点击获取input内容</button>
        <button onClick={this.handleClick}>点击更新组件</button>
      </>
    );
  }
}
export default App;
