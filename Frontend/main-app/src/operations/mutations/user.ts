import { userAPIService } from "@/services/api";
import { IUserLoginResponse } from "../types/user";

interface IAPIResponse<T> {
  data: T;
  status: number;
}
type ISignInsponse = IAPIResponse<IUserLoginResponse>;

async function userSignupMutation(user: any) {
  return userAPIService.register(user);
}

async function userSigninMutation(user: any): Promise<ISignInsponse> {
  const result = await userAPIService.login(user);
  return { data: result.data, status: result.status };
}

export { userSignupMutation, userSigninMutation };
