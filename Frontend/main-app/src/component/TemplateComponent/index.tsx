import Box from "@mui/material/Box";

import { Button, Dialog, Input, Slide, TextField } from "@mui/material";
import useStyle from "./style";
import { ITemplateAPI } from "@/operations/types";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import UploadDesign from "../UploadDesign";
import { TabPanel } from "@mui/base";
import LibraryComponent from "../UploadDesign/Library";
const ariaLabel = { "aria-label": "description" };
import models from "./model.json";
import React from "react";
import { TransitionProps } from "react-transition-group/Transition";
interface ITemplateComponentTypes {
  templates?: ITemplateAPI[];
  onCreateTemplate: any;
  dialog: any;
  setDialog: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TemplateComponent: React.FC<ITemplateComponentTypes> = ({
  templates = [],
  onCreateTemplate,
  dialog,
  setDialog,
}) => {
  const [modelsData, seModelsData] = useState<any>(models);
  const classes = useStyle();
  const selectedModel = useState<any[]>([]);

  const [error, setError] = useState("");

  const [rowSelection, setRowSelection] = useState({});

  const isDisableButton = modelsData.every((item) => !item.isSelect);

  const templateInputRef: any = useRef();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Template name",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "createdAt",
        header: "created At",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
    ],
    []
  );

  const onCloseDialog = () => {
    setDialog(false);
  };

  useEffect(() => {}, [rowSelection]);

  const tableInstanceRef: any = useRef(null);

  const onCreate = () => {
    setDialog(true);
  };

  const onClickModel = (id) => {
    const newModels = modelsData.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return { ...item, isSelect: !item.isSelect };
    });
    seModelsData(newModels);
  };
  const onSave = () => {
    const templateName = templateInputRef.current.value;
    if (!templateName) {
      setError("error");
    } else {
      setError("");
    }

    const selectedModels = modelsData.filter((item) => !!item.isSelect);

    onCreateTemplate({
      name: templateName,
      metadata: JSON.stringify(selectedModels),
    });
  };
  return (
    <>
      <Box className={classes.container}>
        <Button variant="contained" onClick={onCreate}>
          Create
        </Button>
        <Dialog
          TransitionComponent={Transition}
          onClose={onCloseDialog}
          open={dialog}
          PaperProps={{
            style: {
              width: "50em",
              minHeight: "12em",
              height: "auto",
              maxWidth: "50em",
            },
          }}
        >
          <Box className={classes.diglogAction}>
            <TextField
              label="Input template name"
              style={{ width: "70%" }}
              inputRef={templateInputRef}
              error={error}
            />
            <Button
              variant="contained"
              onClick={onSave}
              disabled={isDisableButton}
            >
              Create
            </Button>
          </Box>
          <LibraryComponent items={modelsData} onClick={onClickModel} />
        </Dialog>

        <MaterialReactTable
          columns={columns}
          data={templates}
          enablePagination={false} //disable a default feature
          onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
          state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
        />
      </Box>
    </>
  );
};

export default TemplateComponent;
