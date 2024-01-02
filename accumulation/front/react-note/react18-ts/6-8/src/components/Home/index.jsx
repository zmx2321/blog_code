import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const Home = () => {
  // 选中高亮逻辑
  const activeStyle = ({ isActive }) => {
    return isActive ? "background" : "";
  };
  const navigate = useNavigate();

  // 编程式路由导航
  const toClassify = () => {
    navigate("classify", { state: { xd: "小滴课堂", website: "xdclass.net" } });
  };

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
        <button onClick={toClassify}>classify</button>
        <NavLink to="navigation" className={activeStyle}>
          navigation
        </NavLink>
      </div>
      <div style={{ background: "red" }}>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
