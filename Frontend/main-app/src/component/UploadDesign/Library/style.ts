import { makeStyles } from "@mui/styles";
const useStyle = makeStyles(
  () => ({
    container: {
      cursor: "pointer",
      position: "relative",
      "&:hover": {
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  }),
  { name: "LibraryUploadComponent" }
);

export default useStyle;
