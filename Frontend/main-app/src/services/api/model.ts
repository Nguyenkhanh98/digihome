import { makeRequest } from "@/configs";
import { Config } from "@/configs";

export const create = async (payload: any) => {
  return makeRequest.API({
    method: "POST",
    url: Config.API_DATA.MODEL_ENDPOINT,
    data: payload,
  });
};
export const updateById = (id: string, payload: any) => {
  return async () =>
    makeRequest.API({
      method: "PUT",
      url: `${Config.API_DATA.MODEL_ENDPOINT}/${id}`,
      data: payload,
    });
};
export const deleteById = (id: string) => {
  return async () =>
    makeRequest.API({
      method: "DELETE",
      url: `${Config.API_DATA.MODEL_ENDPOINT}/${id}`,
    });
};
export const getById = (id: string) => {
  return async () =>
    makeRequest.API({
      method: "GET",
      url: `${Config.API_DATA.MODEL_ENDPOINT}/${id}`,
    });
};
export const getAll = () => {
  return makeRequest.API({
    method: "GET",
    url: Config.API_DATA.MODEL_ENDPOINT,
  });
};
