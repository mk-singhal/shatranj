import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Fab from "@mui/material/Fab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import SvgIcon from "@mui/material/SvgIcon";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { BlogType } from "../../Types";
import CircularProgress from "@mui/material/CircularProgress";

const limit = 5;

export default function ColorTabs() {
  const navigate = useNavigate();

  // Selecting the tab based on the route
  let location = useLocation();
  const route = ["/blog", "/my-blog"];
  const [tab, setTab] = React.useState(
    location.pathname === route[0] ? "one" : "two"
  );
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  // Sorting the blogs
  const [sort, setSort] = React.useState("");
  const handleSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  // Fetching the blogs
  const [blogs, setBlogs] = React.useState<BlogType[] | null>(null);
  const getblogs = async () => {
    try {
      const response = await axios.get(`/blog?offset=0&limit=${limit}`);
      response.data.blogs.length === 0
        ? setBlogs(null)
        : setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getblogs();
  }, []);

  // Determining the height for the scrollable container
  const theme = useTheme();
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [targetRefHeight, setTargetRefHeight] = React.useState(0);
  React.useEffect(() => {
    if (targetRef.current) {
      setTargetRefHeight(targetRef.current.offsetHeight);
    }
  }, []);

  // Infinite scroll
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const [moreContent, setMoreContent] = React.useState(true);
  const [isBlogLoading, setIsBlogLoading] = React.useState(false);
  const [index, setIndex] = React.useState(limit);
  const fetchBlogs = React.useCallback(async () => {
    console.log(isBlogLoading, !moreContent);
    if (isBlogLoading || !moreContent) return;

    setIsBlogLoading(true);
    try {
      const response = await axios.get(`/blog?offset=${index}&limit=${limit}`);
      response.data.blogs.length === limit
        ? setMoreContent(true)
        : setMoreContent(false);
      response.data.blogs.length === 0
        ? setIsBlogLoading(false)
        : setBlogs((prevItems) => {
          if (prevItems) return [...prevItems, ...response.data.blogs];
          getblogs();
          return [...response.data.blogs]
        });
    } catch (error) {
      console.log(error);
      setMoreContent(false);
    }
    setIndex((prevIndex) => prevIndex + limit);
    setIsBlogLoading(false);
  }, [index, isBlogLoading]);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchBlogs();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchBlogs]);

  return (
    <Box
      component="main"
      sx={{
        width: {
          xs: "100vw",
          md: `calc(100vw - ${theme.spacing(8)} - 1px)`,
          lg: "calc(100vw - 240px)",
        },
        p: { xs: 1, md: 2 },
      }}
    >
      <Grid container ref={targetRef}>
        <Grid item xs={12}>
          <Typography variant="h4">Blogs</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Tabs value={tab} onChange={handleChange} aria-label="Tabs for blogs">
            <Tab
              value="one"
              component={RouterLink}
              to={route[0]}
              label="Blogs"
              sx={{
                ":focus": { outline: "none" },
                "&:hover:not(.Mui-selected)": {
                  color: "text.hover", //"#ba9b32"
                },
              }}
            />
            <Tab
              value="two"
              component={RouterLink}
              to={route[1]}
              label="My Blogs"
              sx={{
                ":focus": { outline: "none" },
                "&:hover:not(.Mui-selected)": {
                  color: "text.hover",
                },
              }}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={6} mt={{ xs: 1, md: 0 }}>
          <Stack
            direction="row"
            spacing={3}
            justifyContent={{ xs: "space-between", md: "flex-end" }}
            alignItems="center"
          >
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              size="small"
              variant="outlined"
            >
              <OutlinedInput
                placeholder="Type to Search"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Sort by</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={sort}
                label="Sort by"
                onChange={handleSort}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"views"}>Views</MenuItem>
                <MenuItem value={"likes"}>Likes</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} pt={1}>
          <Box
            sx={{
              maxHeight: {
                xs: `calc(100vh - ${theme.spacing(
                  3
                )} - ${targetRefHeight}px - 56px)`,
                sm: `calc(100vh - ${theme.spacing(
                  3
                )} - ${targetRefHeight}px - 64px)`,
                md: `calc(100vh - ${theme.spacing(5)} - ${targetRefHeight}px)`,
              },
              overflowY: "auto",
            }}
          >
            {!blogs && <Typography variant="h6">No Blog present</Typography>}
            {blogs &&
              blogs.map((blog) => (
                <div key={blog.id}>
                  <Card
                    sx={{
                      minHeight: "15%",
                      maxHeight: "15%",
                      justifyContent: "space-between",
                      display: "flex",
                      boxShadow: "none",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "75%",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <CardContent
                        sx={{ flex: "1 0 auto", pb: 1, cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/blog/${blog.slug}`);
                        }}
                      >
                        <Typography component="div" variant="h5" noWrap>
                          {blog.title}
                        </Typography>
                        <Typography
                          noWrap
                          sx={{ wordBreak: "break-word" }}
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {blog.content.replace(/<[^>]+>/g, " ")}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 2,
                          pb: 2,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          maxWidth={"100%"}
                          overflow={"auto"}
                          sx={{ scrollbarWidth: "none" }}
                        >
                          <Chip
                            label={blog.tag.name}
                            color="primary"
                            onClick={() => {
                              console.log("Chip Clicked");
                              navigate(`/blog/tag/${blog.tag.id}`);
                            }}
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 2,
                          pb: 1,
                        }}
                      >
                        <SvgIcon
                          onClick={() => {
                            navigate(`/blog/${blog.slug}`);
                          }}
                          cursor="pointer"
                          className="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-11pbyhm-MuiSvgIcon-root"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="FavoriteTwoToneIcon"
                        >
                          <path
                            d="M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5 5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5"
                            opacity=".3"
                            style={{ color: "red" }}
                          ></path>
                          <path
                            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"
                            style={{ color: "black" }}
                          ></path>
                        </SvgIcon>
                        <Typography
                          onClick={() => {
                            navigate(`/blog/${blog.slug}`);
                          }}
                          sx={{ cursor: "pointer" }}
                          component="div"
                          variant="subtitle1"
                          color="text.secondary"
                          pl={1}
                          minWidth={{ xs: 80, sm: 100 }}
                        >
                          12345
                        </Typography>
                        <SvgIcon
                          onClick={() => {
                            navigate(`/blog/${blog.slug}`);
                          }}
                          cursor="pointer"
                          className="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-11pbyhm-MuiSvgIcon-root"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="VisibilityTwoToneIcon"
                        >
                          <path
                            d="M12 6c-3.79 0-7.17 2.13-8.82 5.5C4.83 14.87 8.21 17 12 17s7.17-2.13 8.82-5.5C19.17 8.13 15.79 6 12 6m0 10c-2.48 0-4.5-2.02-4.5-4.5S9.52 7 12 7s4.5 2.02 4.5 4.5S14.48 16 12 16"
                            opacity=".3"
                            style={{ color: "#00aaff" }}
                          ></path>
                          <path
                            d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4m0 13c-3.79 0-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6s7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17m0-10c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7m0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 9 12 9s2.5 1.12 2.5 2.5S13.38 14 12 14"
                            style={{ color: "black" }}
                          ></path>
                        </SvgIcon>
                        <Typography
                          onClick={() => {
                            navigate(`/blog/${blog.slug}`);
                          }}
                          sx={{ cursor: "pointer" }}
                          component="div"
                          variant="subtitle1"
                          color="text.secondary"
                          pl={1}
                          minWidth={{ xs: 80, sm: 100 }}
                        >
                          12345
                        </Typography>
                        <SvgIcon
                          onClick={() => {
                            navigate(`/blog/user/${blog.user.id}`);
                          }}
                          cursor="pointer"
                          className="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-11pbyhm-MuiSvgIcon-root"
                          focusable="false"
                          aria-hidden="true"
                          sx={{ maxHeight: 24, maxWidth: 24 }}
                          viewBox="0 0 24 24"
                          data-testid="PersonOutlineTwoToneIcon"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="2.1"
                            opacity=".3"
                            style={{ color: "blueviolet" }}
                          ></circle>
                          <path
                            d="M12 14.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"
                            opacity=".3"
                            style={{ color: "blueviolet" }}
                          ></path>
                          <path
                            d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m6.1 5.1H5.9V17c0-.64 3.13-2.1 6.1-2.1s6.1 1.46 6.1 2.1zM12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0-6.1c1.16 0 2.1.94 2.1 2.1 0 1.16-.94 2.1-2.1 2.1S9.9 9.16 9.9 8c0-1.16.94-2.1 2.1-2.1"
                            style={{ color: "black" }}
                          ></path>
                        </SvgIcon>
                        <Typography
                          onClick={() => {
                            navigate(`/blog/user/${blog.user.id}`);
                          }}
                          sx={{ cursor: "pointer" }}
                          component="div"
                          variant="subtitle1"
                          color="text.secondary"
                          pl={1}
                          minWidth={100}
                        >
                          {blog.user.firstName + " " + blog.user.lastName}
                        </Typography>
                      </Box>
                    </Box>
                    <CardMedia
                      onClick={() => {
                        navigate(`/blog/${blog.slug}`);
                      }}
                      component="img"
                      sx={{
                        p: 2,
                        width: "25%",
                        height: "25%",
                        cursor: "pointer",
                      }}
                      image={`http://localhost:3500/static/${blog.image}`}
                      alt="Live from space album cover"
                    />
                  </Card>
                  <Divider variant="middle" />
                </div>
              ))}
            <Box sx={{ minHeight: "10px" }} ref={loaderRef}>
              {isBlogLoading && moreContent && <CircularProgress />}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Fab
        aria-label="edit"
        onClick={() => navigate("/blog/add")}
        sx={{ position: "absolute", bottom: 20, right: 40 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
