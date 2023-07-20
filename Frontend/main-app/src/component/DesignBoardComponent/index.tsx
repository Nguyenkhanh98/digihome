import useStyle from "./style";
import { Env } from "@/configs";

export function DesignBoardComponent({ onLoad, iframeRef }: any) {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <iframe
        className={classes.iframe}
        src={Env.MICRO_FRONTEND_URL.DESIGN_BOARD}
        onLoad={onLoad}
        ref={iframeRef}
        id="myIframe"
      ></iframe>
    </div>
  );
}

export default DesignBoardComponent;
