import React from "react";

class App extends React.Component {
  inputRef1 = React.createRef();
  inputRef2 = React.createRef();

  popClick = () => {
    console.log(this.inputRef1.current.value);
    console.log(this.inputRef2.current.value);
  };

  blur = (e) => {
    console.log(e.target.value);
  };

  render() {
    return (
      <>
        <input type="text" placeholder="请输入内容" ref={this.inputRef1} />
        <input type="text" placeholder="请输入内容" ref={this.inputRef2} />
        <button onClick={this.popClick}>点击获取input内容</button>
        <input type="text" onBlur={this.blur} />
      </>
    );
  }
}
export default App;
