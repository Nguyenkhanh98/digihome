import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import useStyle from "./style";
import { useEffect, useState } from "react";
import ims from "@/component/TemplateComponent/models/thumbnails/thumbnail_window.png";
import Box from "@mui/material/Box/Box";
import { Checkbox } from "@mui/material";

export default function OverlaySelect() {
  const classes = useStyle();
  return (
    <>
      <Box className={classes.container}>
        <Checkbox defaultChecked color="success" className={classes.checkbox} />
      </Box>
    </>
  );
}
