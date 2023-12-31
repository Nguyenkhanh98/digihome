import { makeStyles } from "@mui/styles";
const useStyle = makeStyles(
  () => ({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    button: {
      width: "5em",
      marginTop: "20px",
    },
  }),
  { name: "SaveDesign" }
);

export default useStyle;
