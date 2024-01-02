// 函数组件
// function App(props) {
//   return <>小滴课堂的{props.text}课程</>;
// }

// 类组件
import React from "react";

class App extends React.Component {
  render() {
    return <>小滴课堂的{this.props.text}课程</>;
  }
}
export default App;
