import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, AvatarGroup, Button, Chip, Stack, Tooltip } from "@mui/material";
import Iconify from "../../../components/Iconfy";
import { capitalizeFirstLetter } from "../../../utils/formatters";

const MENU_STYLES = {
  backgroundColor: "transparent",
  borderRadius: "4px",
  color: "white",
  "&:hover": {
    color: "primary.50",
    backgroundColor: "primary.50", // Thay đổi màu khi hover
  },
  ".MuiChip-icon": {
    color: "white",
  },
};

function BoardBar({ board }) {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      width={1}
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        overflowX: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        "&::-webkit-scrollbar-track": { m: 2 },
      }}
      justifyContent="space-between"
      gap={2}
      px={2}
    >
      <Stack direction={"row"} gap={1} alignItems="center">
        <Tooltip title={board?.description}>
        <Chip
          icon={
            <Iconify
              icon="ri:dashboard-fill"
              width={20}
              height={20}
              color="primary.main"
            />
          }
          label={board?.title}
          clickable
          sx={MENU_STYLES}
        />
        </Tooltip>
        <Chip
          icon={
            <Iconify
              icon="material-symbols:vpn-lock"
              width={20}
              height={20}
              color="primary.main"
            />
          }
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={
            <Iconify
              icon="material-symbols:add-to-drive"
              width={20}
              height={20}
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
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
          variant="outlined"
          startIcon={<PersonAddIcon sx={{ width: 18, height: 18 }} />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          total={7}
          sx={{
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 16,
              border: "none",
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
