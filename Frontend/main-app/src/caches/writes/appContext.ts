import { useQueryClient } from "@tanstack/react-query";
import { VAR_CACHE_APP_CONTEXT_SETTING } from "../vars";

export const useWriteCacheAppContext = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    queryClient.setQueryData(
      [VAR_CACHE_APP_CONTEXT_SETTING],
      (preState: any) => {
        return {
          ...preState,
          ...data,
        };
      }
    );
    // queryClient.invalidateQueries([VAR_CACHE_APP_CONTEXT_SETTING]);
  };
};
