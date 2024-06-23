import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import SvgIcon from "@mui/material/SvgIcon";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BlogDetail() {
  const navigate = useNavigate();

  const theme = useTheme();
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [targetRefHeight, setTargetRefHeight] = React.useState(0);
  React.useEffect(() => {
    if (targetRef.current) {
      console.log(targetRef.current, targetRef.current.offsetHeight);
      setTargetRefHeight(targetRef.current.offsetHeight);
    }
  }, []);

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
          <Box
            sx={{
              display: "flex",
              // flexDirection: { md: "row" },
            }}
          >
            <Typography variant="h4" mr={"auto"}>
              Blogs
            </Typography>
            <Button color="error" variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Fab
              aria-label="edit"
              sx={{ position: "absolute", bottom: 20, right: 40 }}
            >
              <ModeEditOutlineTwoToneIcon />
            </Fab>
          </Box>
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
            <Card
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
              }}
            >
              {/* <Fab color="secondary" aria-label="edit">
                <EditIcon />
              </Fab> */}
              <CardMedia
                component="img"
                sx={{
                  p: 1,
                  maxWidth: "40%",
                  maxHeight: "40%",
                }}
                image="/assets/no-profile/profile3.svg"
                alt="Live from space album cover"
              />
              <CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
                <Typography component="div" variant="h5">
                  Can You Solve the Challenges an International Master Faces
                  During a Game? Can You a a aaa Solve the Challenges an
                  International Master Faces During a Game?
                </Typography>
              </CardContent>
              <Grid container p={1}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 2,
                    }}
                  >
                    <SvgIcon
                      onClick={() => {
                        navigate(`/blog/user/manik`);
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
                        navigate(`/blog/user/manik`);
                      }}
                      sx={{ cursor: "pointer" }}
                      component="div"
                      variant="subtitle1"
                      color="text.secondary"
                      px={1}
                      fontWeight={600}
                    >
                      Manik
                    </Typography>
                    posted in
                    <Chip
                      label="#orderAccessPortal"
                      color="primary"
                      sx={{ ml: 1 }}
                      onClick={() => {
                        console.log("Chip Clicked");
                        navigate(`/blog/tag/primary`);
                      }}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 2,
                    }}
                  >
                    <SvgIcon
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      sx={{ maxHeight: 24, maxWidth: 24, mr: 1 }}
                      data-testid="EventTwoToneIcon"
                    >
                      <path
                        d="M5 8h14V6H5z"
                        opacity=".3"
                        style={{ color: "green" }}
                      ></path>
                      <path
                        d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zm0-12H5V6h14zm-7 5h5v5h-5z"
                        style={{ color: "black" }}
                      ></path>
                    </SvgIcon>
                    on
                    <Typography
                      component="div"
                      variant="subtitle1"
                      color="text.secondary"
                      px={1}
                    >
                      Jun 21, 2024
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { md: "column" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        pl: 2,
                      }}
                    >
                      <SvgIcon
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
                        component="div"
                        variant="subtitle1"
                        color="text.secondary"
                        ml={1}
                        minWidth={{ xs: 40, sm: 60 }}
                      >
                        12345
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        pl: 2,
                      }}
                    >
                      <SvgIcon
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
                        component="div"
                        variant="subtitle1"
                        color="text.secondary"
                        ml={1}
                        minWidth={{ xs: 40, sm: 60 }}
                      >
                        12345
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <CardContent sx={{ flex: "1 0 auto", pb: "64px !important" }}>
                <Typography component="p">
                  Menus that are generated by the bottom app bar (such as a
                  bottom navigation drawer or overflow menu) open as bottom
                  sheets at a highe vation than the bar. Menus that are
                  generated by the bottom app bar (such as a bottom navigation
                  drawer or overflow menu) open as bottom sheets at a highe
                  vation than the bar. Menus that are generated by the bottom
                  app bar (such as a bottom navigation drawer or overflow menu)
                  open as bottom sheets at a highe vation than the bar. Menus
                  that are generated by the bottom app bar (such as a bottom
                  navigation drawer or overflow menu) open as bottom sheets at a
                  highe vation than the bar. Menus that are generated by the
                  bottom app bar (such as a bottom navigation drawer or overflow
                  menu) open as bottom sheets at a highe vation than the bar.
                  Menus that are generated by the bottom app bar (such as a
                  bottom navigation drawer or overflow menu) open as bottom
                  sheets at a highe vation than the bar. Menus that are
                  generated by the bottom app bar (such as a bottom navigation
                  drawer or overflow menu) open as bottom sheets at a highe
                  vation than the bar. Menus that are generated by the bottom
                  app bar (such as a bottom navigation drawer or overflow menu)
                  open as bottom sheets at a highe vation than the bar. Menus
                  that are generated by the bottom app bar (such as a bottom
                  navigation drawer or overflow menu) open as bottom sheets at a
                  highe vation than the bar. open.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
