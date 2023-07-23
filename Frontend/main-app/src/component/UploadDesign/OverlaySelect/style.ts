import { makeStyles } from "@mui/styles";
const useStyle = makeStyles(
  () => ({
    container: {
      cursor: "pointer",
      position: "absolute",
      // "&:hover": {
      //   "&::before": {
      //     content: '""',
      //     position: "absolute",
      //     top: 0,
      //     left: 0,
      //     width: "100%",
      //     height: "100%",
      //     backgroundColor: "rgba(0, 0, 0, 0.2)",
      //   },
      // },
    },
    checkbox: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  }),
  { name: "OverlaySelect" }
);

export default useStyle;
