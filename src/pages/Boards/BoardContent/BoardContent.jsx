import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { mapOrder } from "~/utils/formatters";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import ListColumns from "./ListColumns/ListColumns";

const ACTIVE_DRAG_ITEM_TYPE = {
  COULMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  const { columns, columnOrderIds } = board;
  // Variable Dnd.
  const [orderedColumns, setOrderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);

  const [activeDragItemType, setActiveDragItemType] = useState(null);

  const [activeDragItemData, setActiveDragItemData] = useState(null);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  // priority for mobile dvices, no bug
  const sensor = useSensors(mouseSensor, touchSensor);

  const handleOnDragEnd = (event) => {
    console.log("handleOnDragEnd", event);
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (item) => item._id === active.id
      );
      const newIndex = orderedColumns.findIndex((item) => item._id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dnOrderedColumnsIds = dndOrderedColumns.map((item) => item._id);
      // console.log({dndOrderedColumns,dnOrderedColumnsIds});
      setOrderedColumns(dndOrderedColumns);
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const handleDragStart = (event) => {
    const {
      id,
      data: {
        current: { columnId },
      },
      data: { current },
    } = event?.active;

    console.log(event, "handleDragStart");

    setActiveDragItemId(id);
    setActiveDragItemType(
      columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COULMN
    );
    setActiveDragItemData(current);
  };

  useEffect(() => {
    const convertColumns = mapOrder(columns, columnOrderIds, "_id");
    setOrderedColumns(convertColumns);
  }, [board]);

  return (
    <DndContext
      onDragEnd={handleOnDragEnd}
      sensors={sensor}
      onDragStart={handleDragStart}
    >
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
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COULMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Stack>
    </DndContext>
  );
}

export default BoardContent;
