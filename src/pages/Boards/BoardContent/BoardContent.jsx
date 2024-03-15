import {
  Stack
} from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

function BoardContent() {
  return (
    <Stack
      direction="row"
      width={1}
      sx={{
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
      p="10px 0"
    >
      <ListColumns />
    </Stack>
  );
}

export default BoardContent;
