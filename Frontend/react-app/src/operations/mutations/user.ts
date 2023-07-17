import { makeRequest, Config } from "@/configs";

const { API_DATA } = Config;

async function userSignupMutation(user: any) {
  try {
    const response = await makeRequest.API(API_DATA.USER_SIGN_UP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

async function userSigninMutation(user: any) {
  try {
    const response = await makeRequest.API(API_DATA.USER_SIGN_IN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

async function userLogoutMutation(user: any) {
  try {
    const response = await makeRequest.API("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
    const data = await response;
    return data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export { userSignupMutation, userSigninMutation, userLogoutMutation };
