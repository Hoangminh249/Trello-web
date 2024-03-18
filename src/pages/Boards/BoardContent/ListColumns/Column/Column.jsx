import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import Iconify from "~/components/Iconfy";
import { mapOrder } from "~/utils/formatters";
import DropdownMenu from "../../DropdownMenu";
import ListCards from "./ListCards/ListCards";

function Column({ column }) {
  const { title, cards, cardOrderIds, _id } = column;
  const oderedCards = mapOrder(cards, cardOrderIds, "_id");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: _id, data: { ...column } });

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Stack
        {...listeners}
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          border: isDragging ? "1px solid grey" : undefined,
        }}
        ml={2}
        borderRadius={0.75}
        height="fit-content"
        maxHeight={(theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }
      >
        {/* Column Header - Title and Actions */}
        <Stack
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
          }}
          px={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontSize={"1rem"} fontWeight={"bold"}>
            {title}
          </Typography>
          <DropdownMenu />
        </Stack>
        {/* Column Body - Cards List */}
        <ListCards cards={oderedCards} />
        {/* End of Post */}
        <Stack
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
          }}
          p={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button startIcon={<Iconify icon="material-symbols:add-ad" />}>
            Add new card
          </Button>
          <Tooltip>
            <Iconify icon="fluent:drag-24-filled" sx={{ cursor: "grab" }} />
          </Tooltip>
        </Stack>
      </Stack>
    </div>
  );
}

export default Column;
