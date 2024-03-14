import React from "react";
import { Avatar, AvatarGroup, Button, Chip, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Iconify from "../../../components/Iconfy";

const MENU_STYLES = {
  backgroundColor: "white",
  borderRadius: "4px",
  color: "primary.main",
  "&:hover": {
    backgroundColor: "primary.50", // Thay đổi màu khi hover
  },
};

function BoardBar() {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      width={1}
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        overflowX: "auto",
      }}
      justifyContent="space-between"
      gap={2}
      borderTop="1px solid #00bfa5"
      px={2}
    >
      <Stack direction={"row"} gap={1} alignItems="center">
        <Chip
          icon={
            <Iconify
              icon="ri:dashboard-fill"
              width={22}
              height={22}
              color="primary.main"
            />
          }
          label="HoangMinh"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={
            <Iconify
              icon="material-symbols:vpn-lock"
              width={22}
              height={22}
              color="primary.main"
            />
          }
          label="Public/Workspace"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={
            <Iconify
              icon="material-symbols:add-to-drive"
              width={22}
              height={22}
              color="primary.main"
            />
          }
          label="Add to drive"
          clickable
          sx={MENU_STYLES}
        />
      </Stack>
      <Stack direction={"row"} gap={2} alignItems="center">
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          total={24}
          sx={{
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 16,
            },
          }}
        >
          <Avatar alt="Remy Sharp" src="/assets/images/profile-image.jpg" />
          <Avatar alt="Remy Sharp" src="/assets/images/profile-image.jpg" />
          <Avatar alt="Remy Sharp" src="/assets/images/profile-image.jpg" />
          <Avatar alt="Remy Sharp" src="/assets/images/profile-image.jpg" />
        </AvatarGroup>
      </Stack>
    </Stack>
  );
}

export default BoardBar;
