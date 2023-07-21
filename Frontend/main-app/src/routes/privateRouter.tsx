import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useCustomNavigate } from "@/hooks/useRedirect";
import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const appContext = useReadCachAppContext();
  const navigate = useCustomNavigate();
  useEffect(() => {
    const token = appContext.token;
    if (!token) {
      return navigate("/login", { state: { pathNavigate: location.pathname } });
    }
  }, [appContext.token]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
export const privateRouterLoader = async ({ params }) => {
  return null;
};
