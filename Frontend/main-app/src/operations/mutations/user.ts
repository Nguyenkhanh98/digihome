import { userAPIService } from "@/services/api";

async function userSignupMutation(user: any) {
  return userAPIService.register(user);
}

async function userSigninMutation(user: any) {
  return userAPIService.login(user);
}

export { userSignupMutation, userSigninMutation };
