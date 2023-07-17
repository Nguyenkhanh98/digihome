import React, { useEffect, useMemo } from "react";
import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import NotFound from "pages/404";
import SignupPage from "@/pages/PageSigup";
import SigninPage, { PageSignin } from "@/pages/PageSignin";
import HomePage from "@/pages/PageHome";

import RootRoute, { rootLoader } from "@/routes/root";
import AuthRoute, { authRouteLoader } from "@/routes/auth";
import LangRoute, { langRouteLoader } from "@/routes/lang";
import PublicRoute, { publicRouteLoader } from "@/routes/public";
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
                  element: <PageSignin />,
                },
                {
                  path: "logout",
                  element: <PageSignin />,
                  // loader: redirectIfUser,
                },
              ],
            },
            {
              path: "",
              element: <HomePage />,
            },
          ],
          // {
          //   path: "/:langPath/auth",
          //   element: <AuthRoute />,
          //   children: [
          //     {
          //       path: "/:langPath/t/m",

          //       element: <SignupPage />,
          //       // loader: redirectIfUser,
          //     },
          //     {
          //       path: "/:langPath/auth",
          //       element: <SigninPage />,
          //       // loader: redirectIfUser,
          //     },
          //   ],
          // },
          // ],
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default React.memo(RouterApp);
