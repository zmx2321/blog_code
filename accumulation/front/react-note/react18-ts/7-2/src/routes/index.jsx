import { Navigate } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import { lazy } from "react";

//动态引入路径传入lazy函数
const Classify = lazy(() => import("../components/Home/components/Classify"));
const Navigation = lazy(() =>
  import("../components/Home/components/Navigation")
);

export default [
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "classify",
        element: <Classify />,
      },
      {
        path: "navigation",
        element: <Navigation />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <Navigate to="about" />,
  },
];
