import { Outlet, redirect } from "react-router-dom";

const AuthRoute = () => {
  return (
    <>
    <Outlet/>
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
