import { templateAPIService } from "@/services/api";

async function useMutationCreateTemplate(model: any) {
  const result = await templateAPIService.create(model);
  return result.data;
}

async function updateTemplateMutation(id: string, model: any) {
  return templateAPIService.updateById(id, model);
}

async function deleteTemplateMutaiion(id: string) {
  return templateAPIService.deleteById(id);
}

export {
  useMutationCreateTemplate,
  updateTemplateMutation,
  deleteTemplateMutaiion,
};
