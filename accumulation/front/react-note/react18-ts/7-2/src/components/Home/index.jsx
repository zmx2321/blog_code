import React, { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

class App extends React.Component {
  activeStyle = ({ isActive }) => {
    return isActive ? "background" : "";
  };
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
          <NavLink to="classify" className={this.activeStyle}>
            classify
          </NavLink>
          <NavLink to="navigation" className={this.activeStyle}>
            navigation
          </NavLink>
        </div>
        <div style={{ background: "red" }}>
          <Suspense fallback={<h2>loading...</h2>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    );
  }
}
export default App;
