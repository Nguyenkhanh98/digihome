import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LibraryComponent from "./Library";
export default function UploadDesign({ onSelect }: any) {
  const [value, setValue] = React.useState("Device");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          style={{ width: "50rem", height: "300px" }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="Device" label="My Device" />
            <Tab value="Library" label="My Library" />
          </TabList>
        </Box>
        <TabPanel value="Device">
          <input type="file"></input>My Device
        </TabPanel>
        <TabPanel value="Library">
          <LibraryComponent />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
