import { Navigate } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";

export default [
  {
    path: "/home",
    element: <Home />,
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
