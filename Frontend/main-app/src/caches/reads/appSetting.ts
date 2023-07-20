import { useQueryClient } from "@tanstack/react-query";
import { VAR_CACHE_APP_SETTING, cacheAppSettingCacheInit } from "../vars";
import { TAppSetting } from "../types";

export const useReadCacheGetLanguage = () => {
  const queryClient = useQueryClient();
  const queryData: TAppSetting =
    queryClient.getQueryData([VAR_CACHE_APP_SETTING]) ||
    cacheAppSettingCacheInit;
  return queryData.languageCode;
};

export const useReadCacheGetLanguageId = () => {
  const queryClient = useQueryClient();
  const queryData: TAppSetting =
    queryClient.getQueryData([VAR_CACHE_APP_SETTING]) ||
    cacheAppSettingCacheInit;
  return queryData.languageId;
};

export const useReadCacheGetCountry = () => {
  const queryClient = useQueryClient();
  const queryData: TAppSetting =
    queryClient.getQueryData([VAR_CACHE_APP_SETTING]) ||
    cacheAppSettingCacheInit;

  return queryData.countryCode;
};
