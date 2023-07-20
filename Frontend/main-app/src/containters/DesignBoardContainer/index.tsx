import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useMutation } from "react-query";
// import eventBus from "@/services/eventBus";
import DesignBoardComponent from "@/component/DesignBoardComponent";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { EACTION } from "@/configs/action";
import { Env } from "@/configs";
import { useCustomNavigate } from "@/hooks/useRedirect";
import UploadDesign from "@/component/UploadDesign";
interface IAction {
  action: EACTION;
  data: any;
}
export function DesignBoardContainer() {
  const navigate = useCustomNavigate();
  const [openDialog, setOpendialog] = useState(false);
  const params = useParams();
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const iframeRef: any = useRef(null);

  const handleIframeLoad = () => {
    setIsLoadingIframe(false);
    console.log("Iframe content loaded successfully!");
    sendDataToIframe();
  };

  useEffect(() => {
    // Listen for a custom event

    const handler = (event: any) => {
      console.log("asdasdasda");

      const origin = event.origin;
      if (origin !== Env.MICRO_FRONTEND_URL.DESIGN_BOARD) {
        return;
      }

      const { action, data }: IAction = event.data;
      if (!Object.values(EACTION).includes(action)) {
        return;
      }
      switch (action) {
        case EACTION.RETURN_PREVIOUS:
          navigate("");
          break;

        case EACTION.LOAD_DESIGN:
          console.log("asdasdasda");
          setOpendialog(true);
          break;

        default:
          break;
      }
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  const sendDataToIframe = () => {
    const data = {
      message: "Hello from the parent component!",
      action: "HELLO",
    };
    iframeRef.current?.contentWindow?.postMessage(data, "*");
  };

  const onSelect = (item) => {
    console.log(item);
  };
  const onCloseDialog = () => {
    setOpendialog(false);
  };

  return (
    <>
      <DesignBoardComponent onLoad={handleIframeLoad} iframeRef={iframeRef} />
      <Dialog onClose={onCloseDialog} open={openDialog}>
        <UploadDesign onSelect={onSelect} />
      </Dialog>
    </>
  );
}

export default DesignBoardContainer;
