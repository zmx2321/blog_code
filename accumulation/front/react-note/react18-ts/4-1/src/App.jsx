import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isWash: false };
  }
  render() {
    return <div>老王今天{this.state.isWash ? "去" : "没去"}洗脚了</div>;
  }
}
export default App;
