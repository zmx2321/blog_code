// 函数组件
// function App(props) {
//   return <>小滴课堂的{props.text}课程</>;
// }

// 类组件
import React from "react";

class Children extends React.Component {
  render() {
    return <>正在学习的课程</>;
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <Children />
        <div>小滴课堂的{this.props.text}课程</div>
      </>
    );
  }
}
export default App;
