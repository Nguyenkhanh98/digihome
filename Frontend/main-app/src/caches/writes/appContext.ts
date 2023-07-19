import { useQueryClient } from "react-query";
import { VAR_CACHE_APP_CONTEXT_SETTING } from "../vars";

export const useWriteCacheAppContext = () => {
  const queryClient = useQueryClient();
  return async (data: any) => {
    await queryClient.setQueryData(
      VAR_CACHE_APP_CONTEXT_SETTING,
      (preState: any) => {
        return {
          ...preState,
          ...data,
        };
      }
    );
    await queryClient.invalidateQueries({
      [VAR_CACHE_APP_CONTEXT_SETTING]: true,
    });
  };
};
