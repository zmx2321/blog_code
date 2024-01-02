import React from "react";
class App extends React.Component {
  state = { counte: 0 };
  add = () => {
    this.setState({ counte: this.state.counte + 1 }, () => {
      console.log("更新后的值：", this.state.counte);
    });
    console.log("更新前的值：", this.state.counte);
  };

  render() {
    return (
      <div>
        <h2>{this.state.counte}</h2>
        <button onClick={this.add}>增加</button>
      </div>
    );
  }
}
export default App;
