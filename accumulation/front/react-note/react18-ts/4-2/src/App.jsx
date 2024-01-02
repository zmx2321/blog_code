import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isWash: false };
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        老王今天{this.state.isWash ? "去" : "没去"}洗脚了
      </div>
    );
  }
  handleClick() {
    console.log("handleClick:", this);
    this.setState({ isWash: !this.state.isWash });
  }
}
export default App;
