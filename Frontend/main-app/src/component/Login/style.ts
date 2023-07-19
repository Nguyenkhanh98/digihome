import { makeStyles } from "@mui/styles";
const loginStyle = makeStyles(
  () => ({
    link: {
      padding: "5px 10px",
      color: "#1976d2",
      //   color: "#fff",
      textDecoration: "underline",
      cursor: "pointer",
      fontSize: "0.875rem",
      "&:hover": {
        textDecoration: "none",
      },
    },
  }),
  { name: "Loginstyle" }
);

export default loginStyle;
