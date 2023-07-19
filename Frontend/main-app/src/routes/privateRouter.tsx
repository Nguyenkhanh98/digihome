import { Outlet, redirect } from "react-router-dom";

const PrivateRoute = () => {
  return (
    <>
    <Outlet/>
    </>
  );
};

export default PrivateRoute;
export const privateRouterLoader = async ({ params }) => {
  const { langPath } = params;
  if (!window.localStorage.getItem("token")) {
    // return redirect("/" + langPath + '/login');
  }
  return null;
};
