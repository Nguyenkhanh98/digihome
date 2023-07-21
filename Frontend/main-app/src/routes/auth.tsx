import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { LOCAL_STORAGE } from "@/configs/storage";
import { useCustomNavigate } from "@/hooks/useRedirect";
import { localStorageAPI } from "@/services/webapi/storage";
import { useEffect } from "react";
import { Outlet, redirect, useLocation, useParams } from "react-router-dom";

const AuthRoute = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;
export const authRouteLoader = async ({ params }) => {
  const token = localStorageAPI.getItem(LOCAL_STORAGE.TOKEN);
  if (token) {
    const { langPath } = params;
    if (window.localStorage.getItem("token")) {
      return redirect("/" + langPath);
    }
  }
  return null;
};
