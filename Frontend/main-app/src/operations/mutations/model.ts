import { modelAPIService } from "@/services/api";

async function createModelMutation(model: any) {
  return modelAPIService.create(model);
}

async function updateModelMutation(id: string, model: any) {
  return modelAPIService.updateById(id, model);
}

async function deleteModelMutaiion(id: string) {
  return modelAPIService.deleteById(id);
}

export { createModelMutation, updateModelMutation, deleteModelMutaiion };
