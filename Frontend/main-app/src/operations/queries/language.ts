import { useQuery } from "react-query";
import { languageAPICMSService } from "@/services/cms";
import { VAR_LANGUAGE_CMS, VAR_TRANSLATETION_CMS } from "../vars";

export function useLanguagesCMSQuery(options = {}) {
  return useQuery(
    VAR_LANGUAGE_CMS,
    languageAPICMSService.getLanguages,
    options
  );
}

export function useCMSQueryTranslationByLang(langId: string, options = {}) {
  return useQuery(
    VAR_TRANSLATETION_CMS,
    languageAPICMSService.getTranslationByLang(langId),
    options
  );
}
