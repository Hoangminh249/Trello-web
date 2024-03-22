import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Iconify from "~/components/Iconfy";
import { mapOrder } from "~/utils/formatters";
import DropdownMenu from "../../DropdownMenu";
import ListCards from "./ListCards/ListCards";

function Column({ column }) {
  const { title, cards, cardOrderIds, _id } = column;
  const oderedCards = mapOrder(cards, cardOrderIds, "_id");

  const [openNewCard, setOpenNewCard] = useState(false);

  const [newCardTitle, setNewCardTitle] = useState("");

  const onOpenNewCard = () => setOpenNewCard(!openNewCard);

  const addNewCard = () => {
    if (!newCardTitle) {
      return toast.error("Please enter Card title");
    }

    onOpenNewCard();
    setNewCardTitle("");
  };

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
        >
          {!openNewCard ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              height={1}
            >
              <Button
                onClick={onOpenNewCard}
                startIcon={<Iconify icon="material-symbols:add-ad" />}
              >
                Add new card
              </Button>
              {/* <Tooltip title="Drag to move"> */}
              <Iconify icon="fluent:drag-24-filled" sx={{ cursor: "grab" }} />
              {/* </Tooltip> */}
            </Stack>
          ) : (
            <Stack
              direction="row"
              data-no-dnd="true"
              alignItems="center"
              height={1}
              gap={1}
            >
              <TextField
                label="Enter Card Title"
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  "& label": { color: "text.primary" },
                  "& input": {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "white",
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    borderRadius: 1,
                  },
                }}
              />
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Button
                  onClick={addNewCard}
                  sx={{
                    boxShadow: "none",
                    border: "0.5px solid",
                    borderColor: (theme) => theme.palette.success.main,
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.success.main,
                    },
                  }}
                  variant="contained"
                  color="success"
                  size="small"
                >
                  Add
                </Button>
                <Iconify
                  icon="iconamoon:close-bold"
                  color={(theme) => theme.palette.warning.light}
                  sx={{ cursor: "pointer" }}
                  width={18}
                  height={18}
                  onClick={onOpenNewCard}
                />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

export default Column;
