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
        backgroundColor: "primary.main",
      }}
    >
      Board Content
    </Stack>
  );
}

export default BoardContent;
