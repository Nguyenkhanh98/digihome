import { useRef } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import useStyle from "./style";
const FileUploadButton = ({ onSelectFile }: any) => {
  const classes = useStyle();
  const fileInputRef: any = useRef(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event: any) {
      const blobContent = event.target.result;
      onSelectFile(blobContent);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <>
      <Box onClick={handleButtonClick} className={classes.container}>
        <Box className={classes.button}>
          <FileUploadIcon />
          <Typography variant="subtitle1" component="p">
            Upload
          </Typography>
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Box>
    </>
  );
};

export default FileUploadButton;
