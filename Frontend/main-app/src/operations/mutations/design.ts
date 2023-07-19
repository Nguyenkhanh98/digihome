import { designAPIService } from "@/services/api";

async function createDesignMutation(design: any) {
  return designAPIService.create(design);
}

async function updateDesignMutation(id: string, design: any) {
  return designAPIService.updateById(id, design);
}

async function deleteDesignMutaiion(id: string) {
  return designAPIService.deleteById(id);
}

export { createDesignMutation, updateDesignMutation, deleteDesignMutaiion };
