import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Refree from "./components/Refree/Refree";
import HomePage from "./components/HomePage/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepOrange, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import Layout from "./components/Layout/Layout";
import Missing from "./components/Missing/Missing";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import BlogAdd from "./components/BlogAdd/BlogAdd";
import UserBlog from "./components/UserBlog/UserBlog";
import TagBlog from "./components/TagBlog/TagBlog";
import BlogEdit from "./components/BlogEdit/BlogEdit";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#60350b" },
          // divider: '#ff8f00',
          background: {
            default: "#ffffff",
            navbar: "#faebd7",
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
            hover: "#C47D37",
            navbarHover: "#8b4726",
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          ":focus": { outline: "none" }
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#B7B7B7 transparent',
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 6,
            backgroundColor: '#B7B7B7',
            minHeight: 24,
            minWidth: 24,
          },
          '&::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#adadad',
          },
          '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#adadad',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#adadad',
          },
          '&::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

function App() {
  const darkModeTheme = createTheme(getDesignTokens("light"));

  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <Box sx={{ width: "100%", display: "flex" }}>
        <BrowserRouter>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:tag" element={<TagBlog />} />
                <Route path="/blog/user/:username" element={<UserBlog />} />
                <Route path="/blog/:tag/:slug" element={<BlogDetail />} />
                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                  <Route path="/my-blog" element={<Blog />} />
                  <Route path="/blog/add" element={<BlogAdd />} />
                  <Route path="/blog/edit/:slug" element={<BlogEdit />} />
                  <Route path="/game" element={<Refree />} />
                </Route>
                {/* Catch all */}
                <Route path="*" element={<Missing />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
