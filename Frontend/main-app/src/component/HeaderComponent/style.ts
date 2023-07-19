import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyle: any = makeStyles(
  (theme: Theme) => ({
    loginButton: {
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
    },
    authCom: {
      display: "flex",
      justifyContent: "right",
      "& div:first-child": {
        marginRight: 10,
      },
    },
  }),
  { name: "HeaderComponent" }
);

export default useStyle;
