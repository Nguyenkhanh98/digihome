import { useQueryClient } from "react-query";
import { VAR_CACHE_APP_CONTEXT_SETTING, appContextInitCache } from "../vars";
import { TAppContext } from "../types";

export const useReadCachAppContext = () => {
  const queryClient = useQueryClient();
  const queryData: TAppContext =
    queryClient.getQueryData(VAR_CACHE_APP_CONTEXT_SETTING) ||
    appContextInitCache;
  return queryData;
};
