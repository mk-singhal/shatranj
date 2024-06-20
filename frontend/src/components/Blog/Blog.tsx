import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function ColorTabs() {
  let location = useLocation();
  const route = ["/blog", "/my-blog"];
  console.log(location, location.pathname);

  const [tab, setTab] = React.useState(
    location.pathname === route[0] ? "one" : "two"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const [layout, setLayout] = React.useState("list");

  const handleLayout = (
    event: React.MouseEvent<HTMLElement>,
    layout: string | null
  ) => {
    if (layout !== null) {
      setLayout(layout);
    }
  };

  const [sort, setSort] = React.useState("");

  const handleSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4">Blogs</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="Tabs for blogs"
          >
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
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            spacing={3}
            justifyContent={{ xs: "space-between", md: "flex-end" }}
            alignItems="center"
          >
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
            <ToggleButtonGroup
              value={layout}
              onChange={handleLayout}
              exclusive
              color="primary"
              aria-label="Layout type"
            >
              <ToggleButton
                value="list"
                key="list"
                sx={{
                  "&:hover": {
                    borderColor: "#0000001f !important",
                  },
                }}
              >
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton
                value="grid"
                key="grid"
                sx={{
                  "&:hover": {
                    borderColor: "#0000001f !important",
                  },
                }}
              >
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}
