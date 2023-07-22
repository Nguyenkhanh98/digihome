import Box from "@mui/material/Box";

import { Button, Input, TextField } from "@mui/material";
import useStyle from "./style";
import { ITemplateAPI } from "@/operations/types";
const ariaLabel = { "aria-label": "description" };

interface ITemplateComponentTypes {
  templates: ITemplateAPI[];
}
const TemplateComponent: React.FC<ITemplateComponentTypes> = ({
  templates,
}) => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Button variant="contained" className={classes.button}>
        Create
      </Button>
    </Box>
  );
};

export default TemplateComponent;
