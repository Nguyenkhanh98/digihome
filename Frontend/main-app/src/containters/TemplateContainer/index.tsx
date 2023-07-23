import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import TemplateComponent from "@/component/TemplateComponent";
import { useMutationCreateTemplate } from "@/operations/mutations/template";
import { useQueryTemplate } from "@/operations/queries/template";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function TemplateContainer() {
  const { mutate, isSuccess } = useMutation(useMutationCreateTemplate);
  const updateAppContext = useWriteCacheAppContext();
  const { data, isFetching, refetch } = useQueryTemplate();
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    if (isFetching) {
      updateAppContext({ backdrop: true });
    } else {
      updateAppContext({ backdrop: false });
    }
  }, [isFetching]);

  const onCreateTemplate = (data: any) => {
    mutate(data, {
      onError: () => {
        toast.error("Some thing occurred. Please try again");
      },
      onSuccess: () => {
        toast.success(`Create successfully`);
      },
      onSettled: () => {
        setDialog(false);
        refetch();
        updateAppContext({ backdrop: false });
      },
    });
  };

  const onSuccess = (callback) => {
    callback();
  };
  return (
    <>
      <TemplateComponent
        templates={data?.data}
        onCreateTemplate={onCreateTemplate}
        isSuccess={onSuccess}
        dialog={dialog}
        setDialog={setDialog}
      />
    </>
  );
}
