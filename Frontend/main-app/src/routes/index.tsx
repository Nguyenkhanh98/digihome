import React, { useEffect, useMemo } from "react";
import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import NotFound from "pages/404";
import SignupPage from "@/pages/PageSignup";
import SigninPage from "@/pages/PageSignin";
import HomePage from "@/pages/PageHome";

import RootRoute, { rootLoader } from "@/routes/root";
import AuthRoute, { authRouteLoader } from "@/routes/auth";
import LangRoute, { langRouteLoader } from "@/routes/lang";
import PublicRoute, { publicRouteLoader } from "@/routes/public";
import PrivateRoute, {privateRouterLoader} from "./privateRouter";
import DesignBoardPage from "@/pages/DesignBoard";
// import Maintenance from 'pages/Maintenance';

const isSetTimeOut = false;

const TIMEOUT =
  process.env.NODE_ENV !== "development" ? 25 * 60 * 1000 : 60 * 60 * 1000;

// const bookingRouter = BOOKING_ROUTES.map((router) => router.path);
// bookingRouter.splice(-1);
const RouterApp = (props: any) => {
  const { lang } = props;

  //   const injectLang = useInjectLang();
  //   const dispatch = useDispatch();
  //   const formatMessage = useTranslation();

  const redirectIfUser = async () => {
    // Add your redirect logic here
  };

  const logoutUser = async () => {};

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootRoute />,
      // loader: rootLoader,
      children: [
        {
          path: ":langPath",
          element: <LangRoute />,
          loader: langRouteLoader,
          children: [
            {
              element: <AuthRoute />,
              loader: authRouteLoader,
              children: [
                // {
                //   path: "",
                //   element: <HomePage />,
                //   // loader: redirectIfUser,
                // },
                {
                  path: "login",
                  element: <SigninPage />,
                },
                 {
                  path: "register",
                  element: <SignupPage />,
                },
                {
                  path: "logout",
                  element: <SigninPage />,
                  // loader: redirectIfUser,
                },
              ],
            },
            {
              path: "",
              element: <HomePage />,
            },
            {
             
              element: <PrivateRoute />,
              loader: privateRouterLoader,
              children: [
                {
                  path: "design-board",
                  element: <DesignBoardPage />,
                },
              ]
            }
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default React.memo(RouterApp);
