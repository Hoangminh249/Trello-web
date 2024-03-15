import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Iconify from "~/components/Iconfy";
import { mapOrder } from "~/utils/formatters";
import DropdownMenu from "../../DropdownMenu";
import ListCards from "./ListCards/ListCards";

function Column({ column }) {
  const { title, cards, cardOrderIds } = column;
  const oderedCards = mapOrder(cards, cardOrderIds, "_id");

  return (
    <Stack
      sx={{
        minWidth: 300,
        maxWidth: 300,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
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
  );
}

export default Column;
