import { apiInstance } from "@/configs";

const userAPIService = {
  login: async () => {
    return apiInstance.login();
  },
};

export default userAPIService;
