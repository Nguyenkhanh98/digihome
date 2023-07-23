import Box from "@mui/material/Box";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button, Input, TextField } from "@mui/material";
import useStyle from "./style";
const ariaLabel = { "aria-label": "description" };

export default function SaveDesignComponent({ thumbnail, onCreate }: any) {
  const classes = useStyle();
  const inputRef: any = useRef();
  const [error, setError] = useState(false);

  const onClick = () => {
    const name = inputRef.current.value;
    if (!name) {
      setError(true);
    } else {
      setError(false);
    }

    onCreate({ name });
  };
  return (
    <Box className={classes.container}>
      <img src={thumbnail} style={{ width: "400px", height: "400px" }}></img>
      <Input
        placeholder="Input file name"
        inputProps={ariaLabel}
        style={{ textAlign: "center", margin: "10px 0" }}
        inputRef={inputRef}
        error={error}
      />

      <Button variant="contained" className={classes.button} onClick={onClick}>
        Save
      </Button>
    </Box>
  );
}
