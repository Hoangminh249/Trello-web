import { Stack } from "@mui/material";
import { mapOrder } from "../../../utils/formatters";
import ListColumns from "./ListColumns/ListColumns";

function BoardContent({ board }) {
  const { columns, columnOrderIds } = board;
  const orderedColumns = mapOrder(columns, columnOrderIds, "_id");

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
      <ListColumns columns={orderedColumns} />
    </Stack>
  );
}

export default BoardContent;
