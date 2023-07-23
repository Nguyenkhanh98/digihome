import { makeRequest } from "@/configs";
import { Config } from "@/configs";

export const create = () => {
  return async (payload: any) => {
    const result = await makeRequest.API({
      method: "POST",
      url: Config.API_DATA.DESIGN_ENDPOINT,
      data: payload,
    });
    return { data: result.data, status: result.status };
  };
};
export const updateById = (id: string, payload: any) => {
  return async () =>
    makeRequest.API({
      method: "PUT",
      url: `${Config.API_DATA.DESIGN_ENDPOINT}/${id}`,
      data: payload,
    });
};
export const deleteById = (id: string) => {
  return async () =>
    makeRequest.API({
      method: "DELETE",
      url: `${Config.API_DATA.DESIGN_ENDPOINT}/${id}`,
    });
};
export const getById = (id: string) => {
  return async () =>
    makeRequest.API({
      method: "GET",
      url: `${Config.API_DATA.DESIGN_ENDPOINT}/${id}`,
    });
};
export const getAll = async () => {
  const result = await makeRequest.API({
    method: "GET",
    url: Config.API_DATA.DESIGN_ENDPOINT,
  });
  return result.data;
};
