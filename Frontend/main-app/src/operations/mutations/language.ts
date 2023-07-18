import { makeRequest } from "@/configs";
import { Config } from "@/configs";

const { CMS_API_DATA } = Config;

async function getLanguagesCMS() {
  try {
    const response = await makeRequest.CMS_API(CMS_API_DATA.LANGUAGE_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export { getLanguagesCMS };
