import {
  horizontalListSortingStrategy, SortableContext
} from "@dnd-kit/sortable";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Iconify from "~/components/Iconfy";
import Column from "./Column/Column";

function ListColumns({ columns }) {
  const [openNewColumn, setOpenNewColumn] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const onOpenNewColumn = () => setOpenNewColumn(!openNewColumn);

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return toast.error("Please enter column name");
    }

    onOpenNewColumn();
    setNewColumnTitle("");
  };

  // sortable required an arrray look like [1,2,3] , in this case using ['id-1,'id-2']
  const transformColumn = columns.map((el) => el._id);
  return (
    <SortableContext
      items={transformColumn}
      strategy={horizontalListSortingStrategy}
    >
      <Stack
        direction={"row"}
        bgcolor="inherit"
        width={1}
        height={1}
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": { m: 2 },
        }}
      >
        {columns.map((col) => {
          return <Column key={col._id} column={col} />;
        })}
        {/* Box add new Column */}

        {!openNewColumn ? (
          <Stack
            minWidth={250}
            maxWidth={250}
            mx={2}
            borderRadius={0.75}
            height="fit-content"
            bgcolor={"#ffffff3d"}
          >
            <Button
              onClick={onOpenNewColumn}
              sx={{ color: "white", width: 1 }}
              startIcon={
                <Iconify
                  icon="ooui:table-add-column-after-ltr"
                  width={18}
                  height={18}
                />
              }
            >
              Add new column
            </Button>
          </Stack>
        ) : (
          <Stack
            minWidth={250}
            maxWidth={250}
            mx={2}
            p={1}
            height="fit-content"
            bgcolor={"#ffffff3d"}
            direction="column"
            gap={1}
          >
            <TextField
              label="Search"
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Button
                onClick={addNewColumn}
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
                Add Column
              </Button>
              <Iconify
                icon="iconamoon:close-bold"
                color="white"
                width={18}
                height={18}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: (theme) => theme.palette.warning.light,
                  },
                }}
                onClick={onOpenNewColumn}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </SortableContext>
  );
}

export default ListColumns;
