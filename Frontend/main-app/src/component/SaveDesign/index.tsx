import Box from "@mui/material/Box";

import { Button, Input, TextField } from "@mui/material";
import useStyle from "./style";
const ariaLabel = { "aria-label": "description" };

export default function SaveDesignComponent({ thumbnail }: any) {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <img src={thumbnail} style={{ width: "400px", height: "400px" }}></img>
      <Input
        placeholder="Input file name"
        inputProps={ariaLabel}
        style={{ textAlign: "center", margin: "10px 0" }}
      />

      <Button variant="contained" className={classes.button}>
        Save
      </Button>
    </Box>
  );
}
