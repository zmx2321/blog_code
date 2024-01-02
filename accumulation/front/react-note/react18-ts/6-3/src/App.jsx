import React from "react";
import { Link, useRoutes } from "react-router-dom";
import routes from "./routes";
import "./app.css";

const App = () => {
  const element = useRoutes(routes);
  return (
    <div className="all">
      <div>
        <div className="link">
          <Link to="/home">打开首页的页面</Link>
        </div>
        <div className="link">
          <Link to="/about">打开关于的页面</Link>
        </div>
      </div>
      <div className="view">{element}</div>
    </div>
  );
};
export default App;
