import axios from "axios";
import { Config } from "./";
import { localStorageAPI } from "@/services/webapi/storage";
import { LOCAL_STORAGE } from "./storage";

let CMSAPIInstance: any;
let APIInstance: any;

function createCMSAPIInstance() {
  if (!CMSAPIInstance) {
    CMSAPIInstance = axios.create({
      baseURL: Config.CMS_API_DATA.URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 8 * 1000,
    });
  }
  return CMSAPIInstance;
}

function createAPIInstance() {
  if (!APIInstance) {
    APIInstance = axios.create({
      baseURL: Config.API_DATA.URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 8 * 1000,
    });

    APIInstance.interceptors.request.use(
      (config) => {
        // Modify request config here (e.g., adding headers, tokens, etc.)
        const token = localStorageAPI.getItem(LOCAL_STORAGE.TOKEN);
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        // Handle request error here
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
      }
    );
  }
  return APIInstance;
}

// Response interceptor
// CMSAPIInstance.interceptors.response.use(
//   (response) => {
//     // Modify response data here
//     console.log("Response Interceptor:", response);
//     return response;
//   },
//   (error) => {
//     // Handle response error here
//     console.error("Response Interceptor Error:", error);
//     return Promise.reject(error);
//   }
// );

export const CMS_API = createCMSAPIInstance();
export const API = createAPIInstance();
