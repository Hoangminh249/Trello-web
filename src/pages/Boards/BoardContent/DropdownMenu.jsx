import { OpenInBrowser } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../../../components/Iconfy";
import MenuPopover from "../../../components/MenuPopover/MenuPopover";

function DropdownMenu() {
  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  return (
    <Box>
      <Iconify
        icon="ep:arrow-down-bold"
        width={18}
        height={18}
        onClick={handleOpen}
      />
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        arrow="bottom-right"
        sx={{
          width: "inherit",
          height: "auto",
          overflowY: "auto",
          "& .MuiMenuItem-root": {
            px: 1,
            borderRadius: 0.75,
          },
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography sx={{ p: 0.5 }}>
          Số trang liên kết <Typography component="span">Title</Typography>
        </Typography>
      </MenuPopover>
    </Box>
  );
}

export default DropdownMenu;
