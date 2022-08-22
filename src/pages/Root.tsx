import { Navigate, useRoutes } from "react-router-dom";
import App from "./app";
import Coins from "./app/cryptocurrency/coins";
import MenuArr from "./app/menus";

const Root = () => {
  return useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        ...MenuArr,
        {
          path: "/cryptocurrency/:id",
          element: <Coins />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
};

export default Root;
