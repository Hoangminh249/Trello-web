import { HelpOutline } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Iconify from "../Iconfy";
import ModeSelect from "../ModeSelect";
import Profile from "./Menus/Profile";
import Recent from "./Menus/Recent";
import Started from "./Menus/Started";
import Templates from "./Menus/Templates";
import Workspaces from "./Menus/Workspaces";

function AppBard() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCloseValue = () => {
    setSearchValue("");
  };

  return (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent="space-between"
      width={1}
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
        overflowX: "auto",
      }}
      px={2}
      gap={1}
    >
      <Stack direction={"row"} gap={2} alignItems="center">
        <Iconify width={24} height={24} color="white" icon="gg:menu-grid-r" />
        <Stack direction="row" alignItems={"center"} gap={0.5}>
          <Iconify color="white" icon="mdi:trello" width={24} height={24} />
          <Typography
            color="white"
            variant="span"
            fontWeight={"bold"}
            fontSize={"1.2rem"}
          >
            Trello
          </Typography>
        </Stack>

        <Box sx={{ display: { xs: "none", md: "flex" } }} gap={1}>
          <Workspaces />
          <Recent />
          <Started />
          <Templates />
          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: "none",
              "&:hover": { border: "none" },
              ".MuiButton-startIcon": {
                marginRight: "4px",
              },
            }}
            startIcon={
              <Iconify
                icon="material-symbols:create-new-folder-outline-rounded"
                width={18}
                height={18}
              />
            }
          >
            Create
          </Button>
        </Box>
      </Stack>

      <Stack direction="row" alignItems={"center"} gap={1}>
        <TextField
          label="Search"
          type="text"
          size="small"
          value={searchValue}
          onChange={handleSearchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="material-symbols:search"
                  color="white"
                  width={18}
                  height={18}
                />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <Iconify
                  icon="iconamoon:close-bold"
                  color="white"
                  width={18}
                  height={18}
                  sx={{ cursor: "pointer" }}
                  onClick={handleCloseValue}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 120,
            maxWidth: 170,
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge variant="dot" color="secondary">
            <Iconify
              icon="mingcute:notification-line"
              color={"white"}
              width={24}
              height={24}
            />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutline sx={{ width: 24, height: 24, color: "white" }} />
        </Tooltip>
        <Profile />
      </Stack>
    </Stack>
  );
}

export default AppBard;
