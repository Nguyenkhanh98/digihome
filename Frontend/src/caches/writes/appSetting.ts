import { useQueryClient } from "react-query";
import { VAR_CACHE_APP_SETTING, cacheAppSettingCacheInit } from "../vars";
import { TAppSetting } from "../types";

export const useWriteCacheSetLanguage = (languageCode: any) => {
  const queryClient = useQueryClient();
  const queryData: TAppSetting =
    queryClient.getQueryData(VAR_CACHE_APP_SETTING) || cacheAppSettingCacheInit;
  queryClient.setQueryData(VAR_CACHE_APP_SETTING, {
    ...queryData,
    languageCode,
  });
};

export const useWriteCacheSetCountry = (countryCode: any) => {
  const queryClient = useQueryClient();
  const queryData: TAppSetting =
    queryClient.getQueryData(VAR_CACHE_APP_SETTING) || cacheAppSettingCacheInit;
  queryClient.setQueryData(VAR_CACHE_APP_SETTING, {
    ...queryData,
    countryCode,
  });
};

export const useWriteCacheSetAppSetting = (data: Partial<TAppSetting>) => {
  const queryClient = useQueryClient();
  const queryData: TAppSetting =
    queryClient.getQueryData(VAR_CACHE_APP_SETTING) || cacheAppSettingCacheInit;
  queryClient.setQueryData(VAR_CACHE_APP_SETTING, { ...queryData, ...data });
};
