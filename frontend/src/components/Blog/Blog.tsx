import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function ColorTabs() {
  let location = useLocation();
  const route = ["/blog", "/my-blog"];
  console.log(location, location.pathname);

  const [value, setValue] = React.useState(
    location.pathname === route[0] ? "one" : "two"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4">Blogs</Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        // textColor="secondary"
        // indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          value="one"
          component={RouterLink}
          to={route[0]}
          label="Blogs"
          sx={{
            ":focus": { outline: "none" },
            "&:hover:not(.Mui-selected)": {
              color: "text.hover" //"#ba9b32"
            }
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
              color: "text.hover"
            }
          }}
        />
      </Tabs>
    </Box>
  );
}
