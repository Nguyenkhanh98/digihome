import { designAPIService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

async function createDesignMutation(design: any) {
  return designAPIService.create(design);
}

function useMutationDesignCreate(options = {}) {
  return useMutation(designAPIService.create(), options);
}

async function updateDesignMutation(id: string, design: any) {
  return designAPIService.updateById(id, design);
}

async function deleteDesignMutaiion(id: string) {
  return designAPIService.deleteById(id);
}

export {
  createDesignMutation,
  updateDesignMutation,
  deleteDesignMutaiion,
  useMutationDesignCreate,
};
