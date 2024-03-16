import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Stack } from "@mui/material";
import Card from "./Card/Card";

function ListCards({ cards }) {
  const transformCard = cards.map((el) => el._id);

  return (
    <SortableContext
      items={transformCard}
      strategy={verticalListSortingStrategy}
    >
      <Stack
        direction="column"
        gap={1}
        p="0 5px"
        m="0 5px"
        maxHeight={(theme) => `calc(
      ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${
          theme.trello.columnFooterHeight
        } - ${theme.trello.columnHeaderHeight})`}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
          },
          "&::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {cards?.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Stack>
    </SortableContext>
  );
}

export default ListCards;
