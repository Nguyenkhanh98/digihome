import { useParams, Outlet } from "react-router-dom";
import { IntlProvider } from "react-intl";
import {
  useCMSQueryTranslationByLang,
  useLanguagesCMSQuery,
} from "@/operations/queries/language";
import { useReadCacheGetLanguageId } from "@/caches/reads/appSetting";
import { useEffect } from "react";
import { TLanguage } from "@/operations/types";
import BackDrop from "@/component/BackDrop";
const LangRouter = () => {
  const languageId = useReadCacheGetLanguageId();
  const params = useParams();
  const langPath = params.langPath;

  const { data: dataLanguages } = useLanguagesCMSQuery();

  const languages: TLanguage[] = dataLanguages?.data?.languages || [];

  let language: any = null;
  if (langPath) {
    language = languages.find((lang) => lang.shortName === langPath);
  }
  const { data, refetch } = useCMSQueryTranslationByLang(
    language ? language.id : "",
    {
      enabled: false, // Enable second query when first query data is available
    }
  );

  useEffect(() => {
    if (language && language.id && languageId !== language.id) {
      refetch();
    }
  }, [language]);

  return (
    <>
      {langPath && (
        <IntlProvider
          messages={data?.data?.data}
          locale={langPath || "vi"}
          defaultLocale={"vi"}
        >
          <Outlet />
          <BackDrop />
        </IntlProvider>
      )}
    </>
  );
};

export default LangRouter;

export const langRouteLoader = async ({ params }) => {
  return params;
};
