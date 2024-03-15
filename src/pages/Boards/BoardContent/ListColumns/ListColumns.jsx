import { Button, Stack } from "@mui/material";
import Iconify from "~/components/Iconfy";
import Column from "./Column/Column";

function ListColumns({ columns }) {
  return (
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
  );
}

export default ListColumns;
