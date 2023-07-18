import { appSettingCacheRead } from "@/caches/reads";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
import {
  useCMSQueryTranslationByLang,
  useLanguagesCMSQuery,
} from "@/operations/queries/language";
import { useReadCacheGetLanguageId } from "@/caches/reads/appSetting";
import { useEffect, useMemo, useState } from "react";
import { TLanguage } from "@/operations/types";
import HomePage from "@/pages/PageHome";
import { withMainLayout } from "@/hocs/withLayoutHome";
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
  const { data, refetch, isSuccess } = useCMSQueryTranslationByLang(
    language ? language.id : "",
    {
      enabled: false, // Enable second query when first query data is available
    }
  );

  useEffect(() => {
    if (language && language.id) {
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
          <Outlet />;
        </IntlProvider>
      )}
    </>
  );
};

export default LangRouter;

export const langRouteLoader = async ({ params }) => {
  return params;
};
