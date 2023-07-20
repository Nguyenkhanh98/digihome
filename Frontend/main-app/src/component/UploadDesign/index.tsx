import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LibraryComponent from "./Library";

import FileUploadButton from "../FileUploadButton";
export default function UploadDesign({ onSelect }: any) {
  const [value, setValue] = React.useState("Device");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="Device" label="Device" />
            <Tab value="Library" label="Library" />
          </TabList>
        </Box>
        <TabPanel value="Device" style={{ padding: 0, height: "10em" }}>
          <FileUploadButton onSelectFile={onSelect} />
        </TabPanel>
        <TabPanel value="Library">
          <LibraryComponent />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
