import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Iconify from "~/components/Iconfy";
function Card({ card }) {
  const { cover, title, memberIds, attachments, comments, _id } = card;

  const isCardActions =
    !!memberIds?.length || !!comments?.length || attachments?.length;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: _id, data: { ...card } });

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid grey" : undefined,
  };

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
        display: card?.FE_PlaceholderCard ? "none" : "block",
      }}
    >
      {cover && <CardMedia sx={{ height: 140 }} image={cover} />}
      <CardContent sx={{ pd: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>{title}</Typography>
      </CardContent>
      {Boolean(isCardActions) && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!memberIds?.length && (
            <Button
              size="small"
              startIcon={
                <Iconify icon="material-symbols:group" width={18} height={18} />
              }
            >
              {memberIds?.length}
            </Button>
          )}
          {!!comments?.length && (
            <Button
              size="small"
              startIcon={
                <Iconify
                  icon="material-symbols:comment"
                  width={18}
                  height={18}
                />
              }
            >
              {comments?.length}
            </Button>
          )}
          {!!attachments.length && (
            <Button
              size="small"
              startIcon={
                <Iconify
                  icon="material-symbols:attachment"
                  width={18}
                  height={18}
                />
              }
            >
              {attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
