import { Button, Stack } from "@mui/material";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Iconify from "~/components/Iconfy";
import Column from "./Column/Column";

function ListColumns({ columns }) {
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
        <Stack
          minWidth={200}
          maxWidth={200}
          mx={2}
          borderRadius={0.75}
          height="fit-content"
          bgcolor={"#ffffff3d"}
        >
          <Button
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
      </Stack>
    </SortableContext>
  );
}

export default ListColumns;
