import React from "react";
import { Stack } from "@mui/material";

function BoardContent() {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      width={1}
      sx={{
        height: (theme) =>
          `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      Board Content
    </Stack>
  );
}

export default BoardContent;
