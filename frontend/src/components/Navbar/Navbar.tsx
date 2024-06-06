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
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "@mui/material";

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
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const drawer = (
    <Box
      sx={{
        bgcolor: "background.navbar",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ display: "block", flexDirection: "column" }}>
        <Link
          href="/"
          underline="none"
          sx={{
            width: "100%",
            display: "flex",
            padding: 1,
            minHeight: 48,
            justifyContent: {
              md: "center",
              lg: "initial",
            },
          }}
        >
          <img src="assets/chess.svg" width={50} />
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
      {/* </Box> */}
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {[
          ["You vs Others", "assets/friend.svg"],
          ["You vs AI", "assets/brain.svg"],
          ["Blogs", "assets/globe.svg"],
          ["Settings", "assets/settings.svg"],
        ].map((text) => (
          <ListItem key={text[0]} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              href={`${text[0].toLowerCase()}`}
              sx={{
                minHeight: 48,
                justifyContent: {
                  xs: "initial",
                  md: "center",
                  lg: "initial",
                },
                px: 2.5,
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
        {(false
          ? [
              [
                "Profile",
                `assets/no-profile/profile${Math.floor(
                  Math.random() * 13 + 1
                )}.svg`,
              ],
              ["Logout", "assets/logout.svg"],
            ]
          : [["Login", "assets/login.svg"]]
        ).map((text) => (
          <ListItem key={text[0]} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              href={`${text[0].toLowerCase()}`}
              sx={{
                minHeight: 48,
                justifyContent: {
                  xs: "initial",
                  md: "center",
                  lg: "initial",
                },
                px: 2.5,
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
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              ":focus": {
                outline: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chess
          </Typography>
          {false ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="profile-menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
                sx={{
                  ":focus": {
                    outline: "none",
                  },
                }}
              >
                <AccountCircle />
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
                <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                <MenuItem onClick={handleProfileClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Link
                href="/"
                underline="none"
                sx={{
                  color: "text.primary",
                }}
              >
                Login
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          anchor="top"
          onTransitionEnd={handleDrawerTransitionEnd}
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
