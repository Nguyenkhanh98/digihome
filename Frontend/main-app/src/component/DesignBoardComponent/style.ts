import { makeStyles } from "@mui/styles";
const useStyle = makeStyles(
  () => ({
    container: {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    },
    iframe: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
  }),
  { name: "DesignBoardComponent" }
);

export default useStyle;
