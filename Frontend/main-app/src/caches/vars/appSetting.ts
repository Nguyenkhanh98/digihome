import { TAppSetting } from "../types";
import { CACHE_PREFIX } from "@/configs/prefix";

export const VAR_CACHE_APP_SETTING = CACHE_PREFIX + "languages";

export const cacheAppSettingCacheInit: TAppSetting = {
  languageCode: "",
  countryCode: "",
  languageId: "",
};
