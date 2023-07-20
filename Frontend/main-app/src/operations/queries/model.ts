import { useQuery } from "@tanstack/react-query";
import { modelAPIService } from "@/services/api";
import { VAR_MODEL_API, VAR_MODEL_API_BY_ID } from "../vars";

export function useModelAPIQuery(options = {}) {
  return useQuery([VAR_MODEL_API], modelAPIService.getAll, options);
}

export function useModelByIdAPIQuery(id: string, options = {}) {
  return useQuery([VAR_MODEL_API_BY_ID], modelAPIService.getById(id), options);
}
