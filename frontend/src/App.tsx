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
                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
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
