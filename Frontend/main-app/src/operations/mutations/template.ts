import { templateAPIService } from "@/services/api";

async function createTemplateMutation(model: any) {
  return templateAPIService.create(model);
}

async function updateTemplateMutation(id: string, model: any) {
  return templateAPIService.updateById(id, model);
}

async function deleteTemplateMutaiion(id: string) {
  return templateAPIService.deleteById(id);
}

export {
  createTemplateMutation,
  updateTemplateMutation,
  deleteTemplateMutaiion,
};
