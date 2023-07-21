export type TUserAPI = {
  email: string;
  firstName: string;
  lastName: string;
};

export interface IUserLoginResponse {
  user: TUserAPI;
  accessToken: string;
}
