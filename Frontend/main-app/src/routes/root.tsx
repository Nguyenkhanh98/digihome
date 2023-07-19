import { cacheWriteAppSetting } from "@/caches/writes";
import { useNavigate, useParams, redirect, Outlet } from "react-router-dom";
import { AppConfig } from "@/configs";
import { useEffect } from "react";
import { useLanguagesCMSQuery } from "@/operations/queries/language";
import { TLanguage } from "@/operations/types";
import BackDrop from "@/component/BackDrop";
  import { ToastContainer } from 'react-toastify';
const RootRoute = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { langPath } = params;
  const { data, isError } = useLanguagesCMSQuery();

  const viewerCountry = data?.headers["cloudfront-viewer-country"];

  const languageCode = AppConfig.MAP_COUNTRY_LANGUAGE[viewerCountry];
  const languages: TLanguage[] = data?.data?.languages || [];

  const language = languages.find((lang) => lang.shortName === languageCode);

  if (languageCode && viewerCountry && language?.id) {
    cacheWriteAppSetting.useWriteCacheSetAppSetting({
      languageCode,
      languageId: language?.id || "",
      countryCode: viewerCountry,
    });
  }

  useEffect(() => {
    if (!langPath && languageCode) {
      navigate("/" + languageCode);
    }
  }, [languageCode, langPath]);

  return (
    <>
      <Outlet />
      <BackDrop/>
      <ToastContainer/>
    </>
  );
};
export const rootLoader = async () => {
  return null;
};
export default RootRoute;
