import React from "react";
import { Stack } from "@mui/material";

function BoardBar() {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      width={1}
      sx={{
        backgroundColor: "primary.dark",
        height: (theme) => theme.trello.boardBarHeight,
      }}
    >
      Board Bar
    </Stack>
  );
}

export default BoardBar;
