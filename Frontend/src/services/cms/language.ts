import { makeRequest } from "@/configs";
import { Config } from "@/configs";

const languageCMSAPIService = {
  getLanguages: async () => {
    return makeRequest.CMS_API({
      method: "GET",
      url: Config.CMS_API_DATA.LANGUAGE_ENDPOINT,
    });
  },
  getTranslationByLang: (langId: string) => {
    return async () =>
      makeRequest.CMS_API({
        method: "GET",
        url: Config.CMS_API_DATA.TRANSLATE_ENDPOINT + "/" + langId,
      });
  },
};

export default languageCMSAPIService;
