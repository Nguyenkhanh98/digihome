import useStyle from "./style";
import {Env} from '@/configs';

export function DesignBoardComponent({onClick}: any) {
    const classes = useStyle();
  return (
    <div className={classes.container} onClick={onClick}>
    <iframe className={classes.iframe} src={Env.MICRO_FRONTEND_URL.DESIGN_BOARD} ></iframe>
    </div>
  );
}

export default DesignBoardComponent;
