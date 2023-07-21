import { useReadCachAppContext } from "@/caches/reads/appContext";
import HeaderComponent from "@/component/HeaderComponent";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import { logoutAction } from "@/pages/PageSignin/helper";
import { toast } from "react-toastify";

export function HeaderContainer() {
  const appContext = useReadCachAppContext();
  const updateAppContext = useWriteCacheAppContext();
  const logout = () => {
    updateAppContext({ token: null, profile: null });
    logoutAction();
    toast.warning(`See you later!`);
  };
  return (
    <>
      <HeaderComponent appContext={appContext} logout={logout} />
    </>
  );
}

export default HeaderContainer;
