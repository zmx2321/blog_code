import { Navigate } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Classify from "../components/Home/components/Classify";
import Navigation from "../components/Home/components/Navigation";

export default [
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "classify/:xd",
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
