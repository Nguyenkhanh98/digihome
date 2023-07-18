import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BGImage from "@/assets/images/img/banner-bg.jpg";
import backgroundTopbanner from ".";
const useStyle = makeStyles(
  (theme: Theme) => ({
    container: {
      background: `url(${BGImage}) center `,
      backgroundSize: "cover",
    },
  }),
  { name: "TopBanner" }
);

export default useStyle;
