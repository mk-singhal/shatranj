import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
                <Toolbar sx={{ display: {md: "none"} }} />
                <Outlet />
            </Box>
        </>
    )
}

export default Layout