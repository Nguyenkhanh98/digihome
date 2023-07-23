import { makeStyles } from "@mui/styles";
const templateStyle = makeStyles(
  () => ({
    container: {
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
    button: {},
    diglogAction: {
      display: "flex",
      justifyContent: "space-between",
      margin: 10,
    },
  }),
  { name: "TemplateStyle" }
);

export default templateStyle;
