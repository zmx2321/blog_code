import React from "react";
import { NavLink, useRoutes } from "react-router-dom";
import routes from "./routes";
import "./app.css";

const App = () => {
  const element = useRoutes(routes);
  const activeStyle = ({ isActive }) => {
    return isActive ? "background" : "";
  };
  return (
    <div className="all">
      <div>
        <div className="link">
          <NavLink to="/home" className={activeStyle}>
            打开首页的页面
          </NavLink>
        </div>
        <div className="link">
          <NavLink to="/about" className={activeStyle}>
            打开关于的页面
          </NavLink>
        </div>
      </div>
      <div className="view">{element}</div>
    </div>
  );
};
export default App;
