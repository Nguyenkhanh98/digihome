export type TUserAPI = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export interface IUserLoginResponse {
  user: TUserAPI;
  accessToken: string;
}
