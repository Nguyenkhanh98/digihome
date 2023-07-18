import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(
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
