import { Stack } from "@mui/material";
import React from "react";
import ModeSelect from "./ModeSelect";

function AppBard() {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      width={1}
      sx={{
        backgroundColor: "primary.light",
        height: (theme) => theme.trello.appBarHeight,
      }}
    >
      <ModeSelect />
    </Stack>
  );
}

export default AppBard;
