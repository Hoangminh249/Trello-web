import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Stack } from "@mui/material";
import { cloneDeep } from "lodash";
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

  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

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

  // find one coluimn by cardId
  const findColumnByCardId = (cardId) => {
    const currentColumn = orderedColumns?.find(
      (item) =>
        item?.cards
          ?.map((card) => card?._id)
          ?.findIndex((e) => e === cardId) !== -1
    );
    return currentColumn;
  };

  // Update state when dnd card between other column
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // find index of activeCard drop
      const overCardIdex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );
      // handle logic for newCardIndex with new Column
      let newCardIdex;

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;

      newCardIdex =
        overCardIdex >= 0
          ? overCardIdex + modifier
          : overColumn?.cards?.length + 1;
      const nextColumns = cloneDeep(prevColumns);

      const nextActiveColumn = nextColumns.find(
        (col) => col._id === activeColumn?._id
      );
      const nextOverColumn = nextColumns?.find(
        (col) => col._id === overColumn?._id
      );

      // handle old Col
      if (nextActiveColumn) {
        // remove current card
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        // Update cardOrderIds arr
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      // handle New Col
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn?.cards?.filter(
          (card) => card._id !== activeDraggingCardId
        );
        // add new current Dragging card to new index || toSpliced : create new Arr and handle dont effect currrent Arr
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(
          newCardIdex,
          0,
          activeDraggingCardData
        );
        // Update cardOrderIds arr
        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(
          (card) => card._id
        );
      }
      console.log(nextColumns, "nextColumns");

      return nextColumns;
    });
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

    if (columnId) {
      const oldColumnData = findColumnByCardId(id);
      setOldColumnWhenDraggingCard(oldColumnData);
    }
  };

  const handleDragOver = (event) => {
    console.log(event, "handleDragOver");
    // Nothing handle if drag column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COULMN) return;
    // handle for card
    const { active, over } = event;
    if (!over || !active) return;
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    // find 2 dnd columns by cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return;

    //handle if drag card to other column
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleOnDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    console.log("handleOnDragEnd", event);

    // handle dnd Card in column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      // find 2 dnd columns by cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);
      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard?._id !== overColumn?._id) {
        // handle dnd other column
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        // handle dnd  same column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (item) => item?._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (item) => item?._id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        console.log(dndOrderedCards, "dndOrderedCards");

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          // find column dropping
          const targetColumn = nextColumns?.find(
            (item) => item?._id === overColumn?._id
          );
          // update 2 value are card and cardOrderIds in targetColumn
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards?.map((card) => card?._id);

          return nextColumns;
        });
      }
    }
    //handle dnd column in board
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COULMN) {
      console.log("Đang kéo column");
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (item) => item._id === active.id
        );
        const newColumnIndex = orderedColumns.findIndex(
          (item) => item._id === over.id
        );

        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        // const dnOrderedColumnsIds = dndOrderedColumns.map((item) => item._id);
        // console.log({dndOrderedColumns,dnOrderedColumnsIds});
        setOrderedColumns(dndOrderedColumns);
      }
    }

    // Data after dnd to null (default value)
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  useEffect(() => {
    const convertColumns = mapOrder(columns, columnOrderIds, "_id");
    setOrderedColumns(convertColumns);
  }, [board]);

  return (
    <DndContext
      onDragEnd={handleOnDragEnd}
      sensors={sensor}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      collisionDetection={closestCorners}
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
