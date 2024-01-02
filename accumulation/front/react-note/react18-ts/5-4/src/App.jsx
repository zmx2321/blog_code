import React from "react";
class App extends React.Component {
  state = { value: "小滴课堂" };

  handleSubmit = () => {
    alert(this.name.value);
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">提交</button>
      </form>
    );
  }
}
export default App;
