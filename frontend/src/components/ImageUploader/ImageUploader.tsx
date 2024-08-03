import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { AlertHTML } from "../../Types";
import CircularProgress from "@mui/material/CircularProgress";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  error: boolean;
  originalImage: string;
  updateImageFile: (File: File | null) => void;
}

function ImageUploader({ error, originalImage, updateImageFile }: Props) {
  const [alert, setAlert] = React.useState<AlertHTML | null>();
  const [loading, setLoading] = React.useState<Boolean>(true);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (originalImage) {
      setPreview(originalImage);
    }
    setLoading(false);
  }, [originalImage]);

  useEffect(() => {
    if (error) {
      setAlert({ severity: "error", message: "Required" });
    } else {
      setAlert(null);
    }
  }, [error]);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    validateFile(file);
  };

  const validateFile = (file: File | null) => {
    if (file) {
      setAlert(null);
      setLoading(true);
      try {
        if (!file.type.startsWith("image/")) {
          console.log("Please select an image file");
          setAlert({
            severity: "error",
            message: "Please select an image file",
          });
        } else if (file.size > 10000000) {
          console.log("Image should be less than 10MB");
          setAlert({ severity: "error", message: "Image should be less than 10MB" });
        } else {
          setAlert(null);
          handleSubmit(file);
        }
      } catch (err: any) {
        setAlert({ severity: "error", message: err });
      } finally {
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        setLoading(false);
      }
    }
  };

  const handleSubmit = (file: File) => {
    // event.preventDefault();
    // console.log(file);
    setPreview(URL.createObjectURL(file));
    updateImageFile(file);
  };

  const handleRemove = () => {
    // event.preventDefault();
    // console.log(file);
    setPreview("");
    updateImageFile(null);
  };

  return (
    <>
      {preview ? (
        <Box
          sx={{
            maxWidth: "80%",
            height: "100%",
            // width: "auto",
            margin: "auto",
            p: 1,
          }}
        >
          <img
            src={preview}
            style={{
              maxWidth: "80%",
              maxHeight: "420px",
              height: "auto",
              width: "auto",
            }}
          />
          <br />
          <Button
            variant="outlined"
            onClick={handleRemove}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: "50%",
            height: "350px",
            width: "auto",
            margin: "auto",
            border: "1px dashed",
          }}
        >
          {alert && (
            <Alert
              // sx={{ marginTop: 2 }}
              severity={alert.severity == "success" ? "success" : "error"}
            >
              {alert.message}
            </Alert>
          )}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{ top: "calc(350px / 2 - 36.5px / 2)" }}
            startIcon={<CloudUploadIcon />}
            disabled={Boolean(loading)}
          >
            Upload Image
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            <VisuallyHiddenInput type="file" onChange={handleFileInput} />
          </Button>
        </Box>
      )}
    </>
  );
}
export default ImageUploader;
