import { useQuery } from "react-query";
import { templateAPIService } from "@/services/api";
import { VAR_TEMPLATE_API, VAR_TEMPLATE_API_BY_ID } from "../vars";

export function useTemplateAPIQuery(options = {}) {
  return useQuery(VAR_TEMPLATE_API, templateAPIService.getAll, options);
}

export function useTemplateByIdAPIQuery(id: string, options = {}) {
  return useQuery(
    VAR_TEMPLATE_API_BY_ID,
    templateAPIService.getById(id),
    options
  );
}
