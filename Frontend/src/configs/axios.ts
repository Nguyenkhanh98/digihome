import axios from "axios";
import { Config } from "./";

let CMSAPIInstance: any;
let APIInstance: any;

function createCMSAPIInstance() {
  if (!CMSAPIInstance) {
    CMSAPIInstance = axios.create({
      baseURL: Config.CMS_API_DATA.URL, // Set a base URL for all requests
      headers: {
        "Content-Type": "application/json", // Set default headers
      },
    });
  }
  return CMSAPIInstance;
}

function createAPIInstance() {
  if (!APIInstance) {
    APIInstance = axios.create({
      baseURL: Config.API_DATA.URL, // Set a base URL for all requests
      headers: {
        "Content-Type": "application/json", // Set default headers
      },
    });
  }
  return APIInstance;
}

// APIInstance.interceptors.request.use(
//   (config) => {
//     // Modify request config here (e.g., adding headers, tokens, etc.)
//     console.log("Request Interceptor:", config);
//     return config;
//   },
//   (error) => {
//     // Handle request error here
//     console.error("Request Interceptor Error:", error);
//     return Promise.reject(error);
//   }
// );

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
