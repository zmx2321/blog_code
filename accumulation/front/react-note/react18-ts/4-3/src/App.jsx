import React from "react";
class App extends React.Component {
  state = { isWash: false };
  render() {
    return (
      <div onClick={this.handleClick}>
        老王今天{this.state.isWash ? "去" : "没去"}洗脚了
      </div>
    );
  }
  handleClick = () => {
    this.setState({ isWash: !this.state.isWash });
  };
}
export default App;
