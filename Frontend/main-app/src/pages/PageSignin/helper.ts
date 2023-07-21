import { LOCAL_STORAGE } from "@/configs/storage";
import { IUserLoginResponse } from "@/operations/types/user";
import { localStorageAPI } from "@/services/webapi/storage";

export const loginSuccessAction = (data: IUserLoginResponse) => {
  localStorageAPI.setItem(LOCAL_STORAGE.TOKEN, data.accessToken);
  localStorageAPI.setItem(LOCAL_STORAGE.PROFILE, JSON.stringify(data.user));
};
export const logoutAction = () => {
  localStorageAPI.remove(LOCAL_STORAGE.TOKEN);
  localStorageAPI.remove(LOCAL_STORAGE.PROFILE);
};
