import { useQuery } from "@tanstack/react-query";
import { designAPIService } from "@/services/api";
import { VAR_DESIGN_API, VAR_DESIGN_API_BY_ID } from "../vars";

export function useQueryDesign(options: any = {}) {
  return useQuery([VAR_DESIGN_API], designAPIService.getAll, options);
}

export function useDesignByIdAPIQuery(id: string, options = {}) {
  return useQuery(
    [VAR_DESIGN_API_BY_ID],
    designAPIService.getById(id),
    options
  );
}
