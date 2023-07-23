import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useMutation } from "@tanstack/react-query";
// import eventBus from "@/services/eventBus";
import DesignBoardComponent from "@/component/DesignBoardComponent";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { EACTION, EACTION_TO_CLIENT } from "@/configs/action";
import { Config, Env } from "@/configs";
import { useCustomNavigate } from "@/hooks/useRedirect";
import UploadDesign from "@/component/UploadDesign";
import { EventBus } from "@/services/eventBus";
import { useEventBus } from "@/hooks/useEventBus";
import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import SaveDesignComponent from "@/component/SaveDesign";
import { useQueryTemplate } from "@/operations/queries/template";
import { useMutationDesignCreate } from "@/operations/mutations/design";
import { toast } from "react-toastify";
import { upLoadFile } from "@/services/aws/s3";
import { useQueryDesign } from "@/operations/queries/design";
const eventBus = new EventBus(Env.MICRO_FRONTEND_URL.DESIGN_BOARD);

export function DesignBoardContainer() {
  const navigate = useCustomNavigate();
  const [currentSaveDesign, setCurrentSaveDesign] = useState<any>(null);
  const params = useParams();
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [dialogSave, setdialogSave] = useState(false);
  const iframeRef: any = useRef(null);
  const appContext = useReadCachAppContext();
  const updateAppContext = useWriteCacheAppContext();
  const { mutate } = useMutationDesignCreate();
  const { data: templates } = useQueryTemplate();
  const { data: designs, refetch } = useQueryDesign();

  const handleIframeLoad = () => {
    setIsLoadingIframe(false);
    console.log("Iframe content loaded successfully!");
    sendDataToIframe();
  };

  const event = useMemo(() => {
    const callBackLoadDesign = () => {
      updateAppContext({ popupDesignBoard: true });
    };

    const callBackSaveDesign = (data: any) => {
      setdialogSave(true);

      setCurrentSaveDesign(data);
    };

    const callBackReturnPrevious = () => {
      navigate("");
    };

    return {
      [EACTION.LOAD_DESIGN]: callBackLoadDesign,
      [EACTION.SAVE_DESIGN]: callBackSaveDesign,
      [EACTION.RETURN_PREVIOUS]: callBackReturnPrevious,
    };
  }, []);

  useEventBus(eventBus, event);

  useEffect(() => {
    eventBus.init();
    return () => {
      eventBus.init(-1);
    };
  }, []);

  const sendDataToIframe = () => {
    if (eventBus.getInstance()) {
      const data = {
        templates: templates?.data,
        action: EACTION.INIT_FRAME,
      };
      eventBus.emit(EACTION.INIT_FRAME, data, iframeRef.current?.contentWindow);
    }
  };

  const onSelect = (item: any) => {
    const textDecoder = new TextDecoder();
    const file = textDecoder.decode(item);

    const data = {
      message: "Load Design",
      action: EACTION_TO_CLIENT.LOAD_DESIGN_CLIENT,
      data: file,
    };
    eventBus.emit(
      EACTION_TO_CLIENT.LOAD_DESIGN_CLIENT,
      { data },
      iframeRef.current?.contentWindow
    );
    onCloseDialog();
  };

  const onCloseDialog = () => {
    updateAppContext({ popupDesignBoard: false });
  };

  const onCloseDialogSave = () => {
    setdialogSave(false);
  };

  const onSaveDesign = async ({ name }) => {
    onCloseDialogSave();
    updateAppContext({ backdrop: true });
    const imgName = `${name}_${new Date().getTime()}.ipg`;
    try {
      const uploadFile = await upLoadFile(
        dataURLtoFile(currentSaveDesign.thumbnail, name),
        imgName
      );
      mutate(
        {
          name,
          thumbnail: uploadFile.Location,
          data: currentSaveDesign.data,
        },
        {
          onError: () => {
            toast.error("Some thing occurred. Please try again");
          },
          onSuccess: () => {
            toast.success("Save design success");
          },
          onSettled: () => {
            refetch();
            updateAppContext({ backdrop: false });
          },
        }
      );
    } catch (error) {
      toast.error("Some thing occurred. Please try again");
      updateAppContext({ backdrop: false });
    }
  };

  const onSelectDesign = (item) => {
    console.log(item, "itemitemitemitem");

    const data = {
      message: "Load Design",
      action: EACTION_TO_CLIENT.LOAD_DESIGN_CLIENT,
      data: item.data,
    };
    eventBus.emit(
      EACTION_TO_CLIENT.LOAD_DESIGN_CLIENT,
      { data },
      iframeRef.current?.contentWindow
    );
    onCloseDialog();
  };

  const designesFormat = designs?.map((design: any) => {
    return { ...design, image: design.thumbnail, title: design.name };
  });

  return (
    <>
      <DesignBoardComponent onLoad={handleIframeLoad} iframeRef={iframeRef} />
      <Dialog
        onClose={onCloseDialog}
        open={appContext.popupDesignBoard}
        PaperProps={{
          style: {
            minWidth: "30em",
            minHeight: "12em",
            height: "auto",
            maxWidth: "40em",
          },
        }}
      >
        <UploadDesign
          onSelect={onSelect}
          designs={designesFormat}
          onSelectDesign={onSelectDesign}
        />
      </Dialog>

      <Dialog
        onClose={onCloseDialogSave}
        open={dialogSave}
        PaperProps={{
          style: {
            minWidth: "30em",
            minHeight: "12em",
            height: "auto",
            maxWidth: "40em",
          },
        }}
      >
        <SaveDesignComponent
          onCreate={onSaveDesign}
          thumbnail={currentSaveDesign?.thumbnail}
        />
      </Dialog>
    </>
  );
}

export default DesignBoardContainer;

function dataURLtoFile(dataURL, filename) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
