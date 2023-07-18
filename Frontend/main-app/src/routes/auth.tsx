import { withMainLayout } from "@/hocs/withLayoutHome";
import { useEffect } from "react";
import { Outlet, redirect, useNavigate, useParams } from "react-router-dom";

const AuthRoute = () => {
  const WithMainLayout = withMainLayout(Outlet);
  return (
    <>
      <WithMainLayout />
    </>
  );
};

export default AuthRoute;
export const authRouteLoader = async ({ params }) => {
  const { langPath } = params;
  if (window.localStorage.getItem("token")) {
    return redirect("/" + langPath);
  }
  return null;
};
