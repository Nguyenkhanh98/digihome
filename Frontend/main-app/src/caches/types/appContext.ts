import { TUserAPI } from "@/operations/types/user";

export type TAppContext = {
  backdrop: boolean;
  popupDesignBoard: boolean;
  token: string | null;
  profile: TUserAPI | null;
};
