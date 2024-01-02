import React from "react";
import { NavLink, Outlet } from "react-router-dom";
class App extends React.Component {
  activeStyle = ({ isActive }) => {
    return isActive ? "background" : "";
  };
  state = { name: "小滴课堂", website: "xdclass.net" };
  render() {
    return (
      <div>
        首页的页面
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <NavLink
            to="classify"
            state={{ xd: this.state.name, website: this.state.website }}
            className={this.activeStyle}
          >
            classify
          </NavLink>
          <NavLink to="navigation" className={this.activeStyle}>
            navigation
          </NavLink>
        </div>
        <div style={{ background: "red" }}>
          <Outlet />
        </div>
      </div>
    );
  }
}
export default App;
