import { makeStyles } from "@mui/styles";

const useStyle: any = makeStyles(
  () => ({
    container: {
      width: "100%",
      height: "100%",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  }),
  { name: "FileUploadButton" }
);

export default useStyle;
