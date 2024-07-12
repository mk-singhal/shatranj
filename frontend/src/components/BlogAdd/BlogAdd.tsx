import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import ImageUploader from "../ImageUploader/ImageUploader";
import SimpleEditor from "../Editor/Editor";
import PublishIcon from "@mui/icons-material/Publish";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AlertHTML, TagType } from "../../Types";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosFilePrivateInstance, axiosPrivateInstance } from "../../api/axios";

interface AutocompleteTagType {
  id: number;
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<AutocompleteTagType>();

export default function BlogDetail() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate(axiosPrivateInstance);
  const axiosFilePrivate = useAxiosPrivate(axiosFilePrivateInstance);

  const [tagList, setTagList] = React.useState<AutocompleteTagType[]>([]);
  React.useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();

    const getTags = async () => {
      try {
        const response = await axiosPrivate.get("/tag", {
          signal: controller.signal,
        });
        // console.log(response.data);
        setTagList(
          response.data.map((d: TagType) => {
            return { id: d.id, title: d.name };
          })
        );
        // console.log("Tags: ", tags);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, []);

  const theme = useTheme();
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [targetRefHeight, setTargetRefHeight] = React.useState(0);
  React.useEffect(() => {
    if (targetRef.current) {
      setTargetRefHeight(targetRef.current.offsetHeight);
    }
  }, []);

  const [header, setHeader] = React.useState<string>("");

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  function updateImageFile(img: File | null) {
    setImageFile(img);
  }

  const [tag, setTag] = React.useState<AutocompleteTagType | null>(null);
  const [open, toggleOpen] = React.useState(false);
  const handleClose = () => {
    setDialogValue({
      id: -1,
      title: "",
    });
    toggleOpen(false);
  };
  const [dialogValue, setDialogValue] = React.useState({
    id: -1,
    title: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError({
      ...validationError,
      tagError: false,
    });
    setTag({ id: dialogValue.id, title: dialogValue.title });
    handleClose();
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertHTML | null>();
  const [validationError, setValidationError] = React.useState({
    imageError: false,
    headingError: false,
    tagError: false,
    editorError: false,
  });
  const [blogContent, setBlogContent] = React.useState({
    words: 0,
    characters: 0,
    content: "",
  });
  React.useEffect(() => {
    setValidationError({
      ...validationError,
      editorError: false,
    });
  }, [blogContent]);

  const handlePost = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setValidationError({
      imageError: imageFile === null,
      headingError: header === "",
      tagError: tag === null,
      editorError: blogContent.words === 0,
    });
    if (
      tag === null ||
      imageFile === null ||
      header === "" ||
      blogContent.words === 0
    )
      return;
    setIsLoading(true);
    const formData: FormData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", header);
    formData.append("tag", tag?.title);
    formData.append("tagId", tag?.id.toString());
    formData.append("content", blogContent.content);
    try {
      const response = await axiosFilePrivate.post("/blog/create", formData);
      if (response.data)
        setAlert({ severity: "success", message: response.data.message });
      navigate("/blog");
    } catch (error: any) {
      if (!error?.response) {
        setAlert({ severity: "error", message: "No Server Response" });
      } else {
        setAlert({
          severity: "error",
          message: error.response.data.message
            ? error.response.data.message
            : "An error occured!",
        });
      }
    } finally {
      // setTimeout(() => {
      //   setAlert(null);
      // }, 3000);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: {
          md: `calc(100vw - ${theme.spacing(8)} - 2px)`,
          lg: `calc(100vw - 240px - 1px)`,
        },
        p: { xs: 1, md: 2 },
      }}
    >
      <Grid container ref={targetRef}>
        <Grid item xs={12} pb={2}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography variant="h4" mr={"auto"}>
              Create a Blog
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => handlePost(e)}
              startIcon={<PublishIcon />}
              disabled={isLoading}
            >
              Post
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-7px",
                  }}
                />
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              maxHeight: {
                xs: `calc(100vh - ${theme.spacing(
                  2
                )} - ${targetRefHeight}px - 56px)`,
                sm: `calc(100vh - ${theme.spacing(
                  2
                )} - ${targetRefHeight}px - 64px)`,
                md: `calc(100vh - ${theme.spacing(4)} - ${targetRefHeight}px)`,
              },
              overflowY: "auto",
            }}
          >
            <Grid
              container
              textAlign={"center"}
              rowSpacing={2}
              columnSpacing={2}
            >
              {alert && (
                <Grid item xs={12}>
                  <Alert
                    sx={{ marginTop: 2 }}
                    severity={alert.severity == "success" ? "success" : "error"}
                  >
                    {alert.message}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <ImageUploader
                  error={validationError.imageError}
                  updateImageFile={updateImageFile}
                />
              </Grid>
              <Grid item xs={12} lg={8}>
                <TextField
                  fullWidth
                  value={header}
                  onChange={(event) => {
                    setValidationError({
                      ...validationError,
                      headingError: false,
                    });
                    setHeader(event.target.value);
                  }}
                  id="outlined-basic"
                  label="Heading"
                  variant="outlined"
                  error={validationError.headingError}
                  helperText={
                    validationError.headingError ? "Heading is required." : ""
                  }
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Autocomplete
                  value={tag}
                  onChange={(_event, newValue) => {
                    setValidationError({
                      ...validationError,
                      tagError: false,
                    });
                    if (typeof newValue === "string") {
                      // timeout to avoid instant validation of the dialog's form.
                      setTimeout(() => {
                        toggleOpen(true);
                        setDialogValue({ id: -1, title: newValue });
                      });
                    } else if (newValue && newValue.inputValue) {
                      toggleOpen(true);
                      setDialogValue({ id: -1, title: newValue.inputValue });
                    } else {
                      setTag(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== "") {
                      filtered.push({
                        id: 0,
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  id="blog-tag"
                  options={tagList}
                  getOptionLabel={(option) => {
                    // for example value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.title;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.title}
                      </li>
                    );
                  }}
                  sx={{ width: { xs: 298, lg: "100%" } }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={validationError.tagError}
                      helperText={
                        validationError.tagError ? "Tag is required." : ""
                      }
                      label="Tag"
                    />
                  )}
                />
                <Dialog open={open} onClose={handleClose}>
                  <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new tag</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue.title}
                        InputProps={{
                          readOnly: true,
                        }}
                        onChange={(event) =>
                          setDialogValue({
                            ...dialogValue,
                            title: event.target.value,
                          })
                        }
                        label="Name"
                        type="text"
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Add</Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </Grid>
              <Grid item xs={12} marginRight={1}>
                {validationError.editorError && (
                  <Alert
                    // sx={{ marginTop: 2 }}
                    severity="error"
                  >
                    Blog content cannot be empty
                  </Alert>
                )}
                <SimpleEditor
                  setContent={setBlogContent}
                  pageHeaderHeight={targetRefHeight}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// const tags: readonly AutocompleteTagType[] = [
//   { id: 1, title: "The Shawshank Redemption" },
//   { id: 2, title: "The Godfather" },
//   { id: 3, title: "The Godfather: Part II" },
//   { id: 4, title: "The Dark Knight" },
//   { id: 5, title: "12 Angry Men" },
//   { id: 6, title: "Schindler's List" },
//   { id: 7, title: "Pulp Fiction" },
//   {
//     id: 8,
//     title: "The Lord of the Rings: The Return of the King",
//   },
//   { id: 9, title: "The Good, the Bad and the Ugly" },
//   { id: 10, title: "Fight Club" },
//   {
//     id: 11,
//     title: "The Lord of the Rings: The Fellowship of the Ring",
//   },
//   {
//     id: 12,
//     title: "Star Wars: Episode V - The Empire Strikes Back",
//   },
// ];
