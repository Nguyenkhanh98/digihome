import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BGImage from "@/assets/images/img/banner-bg.jpg";
import backgroundTopbanner from ".";
const useStyle: any = makeStyles(
  (theme: Theme) => ({
    container: {
      background: `url(${BGImage}) center `,
      backgroundSize: "cover",
    },
  }),
  { name: "UploadDesign" }
);

export default useStyle;
