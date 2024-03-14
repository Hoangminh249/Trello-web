import { HelpOutline } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Iconify from "../Iconfy";
import ModeSelect from "../ModeSelect";
import Profile from "./Menus/Profile";
import Recent from "./Menus/Recent";
import Started from "./Menus/Started";
import Templates from "./Menus/Templates";
import Workspaces from "./Menus/Workspaces";

function AppBard() {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent="space-between"
      width={1}
      sx={{
        height: (theme) => theme.trello.appBarHeight,
        overflowX: "auto",
      }}
      px={2}
      gap={1}
    >
      <Stack direction={"row"} gap={2} alignItems="center">
        <Iconify
          width={24}
          height={24}
          color="primary.main"
          icon="gg:menu-grid-r"
        />
        <Stack direction="row" alignItems={"center"} gap={0.5}>
          <Iconify
            color="primary.main"
            icon="mdi:trello"
            width={24}
            height={24}
          />
          <Typography
            color="primary.main"
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
          <Button variant="outlined">Create</Button>
        </Box>
      </Stack>

      <Stack direction="row" alignItems={"center"} gap={1}>
        <TextField
          label="Search"
          type="search"
          size="small"
          sx={{ minWidth: 120 }}
        />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge variant="dot" color="secondary">
            <Iconify
              icon="mingcute:notification-line"
              color={"primary.main"}
              width={24}
              height={24}
            />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutline sx={{ width: 24, height: 24, color: "primary.main" }} />
        </Tooltip>
        <Profile />
      </Stack>
    </Stack>
  );
}

export default AppBard;
