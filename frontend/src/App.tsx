import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Referee from "./components/Refree/Refree";
import HomePage from "./components/HomePage/HomePage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepOrange, grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SignIn from "./components/Signin/Signin";
import SignUp from "./components/Signup/Signup";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {main: '#60350b'},
          // divider: '#ff8f00',
          background: {
            default: '#ffffff',
            navbar: '#faebd7',
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
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/game", element: <Referee /> },
  ]);

  const darkModeTheme = createTheme(getDesignTokens('light'));

  return (
    <ThemeProvider theme={darkModeTheme}>
      <Box sx={{ width: "100%", display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>    
  );
}

export default App;
