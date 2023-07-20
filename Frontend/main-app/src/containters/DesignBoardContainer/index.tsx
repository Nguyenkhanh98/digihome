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
      console.log("TTTTTTTTTTTTTTTTTT", data);
      setdialogSave(true);
      // updateAppContext({ popupDesignBoard: true });

      setCurrentSaveDesign(data);
      // updateAppContext({ popupDesignBoard: true });
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
        message: "Hello from the parent component!!!!",
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
        <UploadDesign onSelect={onSelect} />
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
          onSelect={onSelect}
          thumbnail={currentSaveDesign?.thumbnail}
        />
      </Dialog>
    </>
  );
}

export default DesignBoardContainer;
