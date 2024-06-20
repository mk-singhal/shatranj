import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const { auth } = React.useContext(AuthContext);
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{
        bgcolor: "background.navbar",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginTop: { xs: "56px", sm: "64px", md: 0 },
      }}
    >
      <Box sx={{ display: "block", flexDirection: "column" }}>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            width: "100%",
            padding: 1,
            minHeight: 48,
            display: { xs: "none", md: "flex" },
            justifyContent: {
              md: "center",
              lg: "initial",
            },
          }}
        >
          <img src="/assets/chess.svg" width={50} />
          <Typography
            sx={{
              ml: 0.5,
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "rgb(36 36 36 / 74%)",
              display: { md: "none", lg: "flex" },
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            Shatranj
          </Typography>
        </Link>
      </Box>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {[
          ["You vs Others", "/assets/friend.svg", "/you-vs-others"],
          ["You vs AI", "/assets/brain.svg", "/you-vs-ai"],
          ["Blogs", "/assets/globe.svg", "/blog"],
          ["Settings", "/assets/settings.svg", "/game"],
        ].map((text) => (
          <ListItem key={text[0]} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={RouterLink}
              to={text[2]}
              sx={{
                minHeight: 48,
                justifyContent: {
                  xs: "initial",
                  md: "center",
                  lg: "initial",
                },
                px: 2.5,
                "&:hover": {
                  color: "text.navbarHover", //"#ba9b32"
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 1, md: "auto", lg: 3 },
                  justifyContent: "center",
                }}
              >
                <img src={text[1]} width={28} />
              </ListItemIcon>
              <ListItemText
                primary={text[0]}
                sx={{
                  opacity: { md: 0, lg: 1 },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        sx={{ flexDirection: "column", display: { xs: "none", md: "flex" } }}
      >
        {auth ? (
          <>
            <ListItem key="Profile" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={RouterLink}
                to="/profile"
                sx={{
                  minHeight: 48,
                  justifyContent: {
                    xs: "initial",
                    md: "center",
                    lg: "initial",
                  },
                  px: 2.5,
                  "&:hover": {
                    color: "text.navbarHover", //"#ba9b32"
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: { xs: 1, md: "auto", lg: 3 },
                    justifyContent: "center",
                  }}
                >
                  <img src="/assets/no-profile/profile1.svg" width={28} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={{
                    opacity: { md: 0, lg: 1 },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key="Logout" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={signOut}
                sx={{
                  minHeight: 48,
                  justifyContent: {
                    xs: "initial",
                    md: "center",
                    lg: "initial",
                  },
                  px: 2.5,
                  "&:hover": {
                    color: "text.navbarHover", //"#ba9b32"
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: { xs: 1, md: "auto", lg: 3 },
                    justifyContent: "center",
                  }}
                >
                  <img src="/assets/logout.svg" width={28} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{
                    opacity: { md: 0, lg: 1 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem key="Login" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={RouterLink}
              to="/login"
              sx={{
                minHeight: 48,
                justifyContent: {
                  xs: "initial",
                  md: "center",
                  lg: "initial",
                },
                px: 2.5,
                "&:hover": {
                  color: "text.navbarHover", //"#ba9b32"
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 1, md: "auto", lg: 3 },
                  justifyContent: "center",
                }}
              >
                <img src="/assets/login.svg" width={28} />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                sx={{
                  opacity: { md: 0, lg: 1 },
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        open={useMediaQuery(theme.breakpoints.up("lg")) ? true : false}
        sx={{ display: { md: "none" }, bgcolor: "background.navbar" }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              color: "text.primary",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              "&:hover": { color: "text.primary" },
              color: "text.primary",
              flexGrow: 1,
            }}
          >
            Shatranj
          </Typography>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="profile-menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <img src="/assets/no-profile/profile1.svg" width={28} />
              </IconButton>
              <Menu
                id="profile-menu-appbar"
                anchorEl={profileAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleProfileClose}
                  sx={{
                    "&:hover": {
                      color: "text.navbarHover", //"#ba9b32"
                    },
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/logout"
                  onClick={() => {
                    handleProfileClose();
                    signOut();
                  }}
                  sx={{
                    "&:hover": {
                      color: "text.navbarHover", //"#ba9b32"
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    color: "text.navbarHover", //"#ba9b32"
                  },
                }}
              >
                Login
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        {/* MuiDrawer is used for mobile view */}
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          anchor="top"
          onClick={handleDrawerClose}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </MuiDrawer>
        {/* MuiDrawer is used for desktop view */}
        <Drawer
          variant="permanent"
          open={useMediaQuery(theme.breakpoints.up("lg")) ? true : false}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
