import { makeRequest } from "@/configs";
import { Config } from "@/configs";

export const login = async (payload: any) => {
  return makeRequest.API({
    method: "POST",
    url: Config.API_DATA.USER_SIGN_IN_ENDPOINT,
    data: payload,
  });
};
export const register = (payload: any) => {
  return makeRequest.API({
    method: "POST",
    url: Config.API_DATA.USER_SIGN_UP_ENDPOINT,
    data: payload,
  });
};
