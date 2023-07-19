import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useMutation } from "react-query";
import eventBus from "@/services/eventBus";
import DesignBoardComponent from "@/component/DesignBoardComponent";
import { useParams } from "react-router-dom";
import { EACTION } from "@/configs/action";
import { Env } from "@/configs";

interface IAction {
  action: EACTION;
  data: any;
}
export function DesignBoardContainer() {
  const params = useParams();
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const iframeRef: any = useRef(null);

  const handleIframeLoad = () => {
    setIsLoadingIframe(false);
    console.log("Iframe content loaded successfully!");
    sendDataToIframe();
  };
  const handleIframeLoadStart = () => {
    setIsLoadingIframe(true);
    console.log("Iframe loading has started.");
  };

  useEffect(() => {
    // Listen for a custom event

    const handler = (event: any) => {
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
          history.back();
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

  return (
    <>
      <DesignBoardComponent
        onLoadStart={handleIframeLoadStart}
        onLoad={handleIframeLoad}
        iframeRef={iframeRef}
      />
    </>
  );
}

export default DesignBoardContainer;
