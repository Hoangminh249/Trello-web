import { Container, Stack } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import AppBard from "~/components/AppBard/AppBard";
import {
  createNewColumn,
  fetchBoardDetails,
  createNewCard,
  updateBoardDetails,
  updateColumnDetails,
  moveCardToOtherColumn,
} from "../../api";
import Loading from "../../components/Loading";
import { mockData } from "../../mock/mock-data";
import { generatePlaceholderCard, mapOrder } from "../../utils/formatters";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

function Board() {
  const [board, setBoard] = useState(null);

  const createColumn = async (newColumnData) => {
    const columnData = await createNewColumn({
      ...newColumnData,
      boardId: board._id,
    });

    columnData.cards = [generatePlaceholderCard(columnData)];
    columnData.cardOrderIds = [generatePlaceholderCard(columnData)._id];

    const newBoard = { ...board };

    newBoard.columns.push(columnData);
    newBoard.columnOrderIds.push(columnData._id);
    setBoard(newBoard);
  };

  const createCard = async (newCardData) => {
    const cardData = await createNewCard({
      ...newCardData,
      boardId: board._id,
    });

    const newBoard = { ...board };

    const columnToUpdate = newBoard.columns.find(
      (item) => item._id === cardData.columnId
    );

    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [cardData];
        columnToUpdate.cardOrderIds = [cardData._id];
      } else {
        columnToUpdate.cards.push(cardData);
        columnToUpdate.cardOrderIds.push(cardData._id);
      }
    }
    setBoard(newBoard);
  };

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((item) => item._id);

    const newBoard = { ...board };

    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Api
    updateBoardDetails(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  const moveCardInSameColumn = (
    dndOrderedCards,
    dndOrderedCardsIds,
    columnId
  ) => {
    const newBoard = { ...board };

    const columnToUpdate = newBoard.columns.find(
      (item) => item._id === columnId
    );

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardsIds;
    }

    setBoard(newBoard);
    // Api
    updateColumnDetails(columnId, { cardOrderIds: dndOrderedCardsIds });
  };

  const handleCardOtherColumns = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((item) => item._id);

    const newBoard = { ...board };

    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    let prevCardOrderIds =
      dndOrderedColumns.find((col) => col._id === prevColumnId)?.cardOrderIds ||
      [];

    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    moveCardToOtherColumn({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(
        (col) => col._id === nextColumnId
      )?.cardOrderIds,
    });
  };

  useEffect(() => {
    // react-router-dom
    const boardId = "65fc1bef2d698afc708ef029";
    // Sắp xếp trước khi truyền dữ liệu

    fetchBoardDetails(boardId).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");

      board.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)];
          col.cardOrderIds = [generatePlaceholderCard(col)._id];
        } else {
          col.cards = mapOrder(col.cards, col.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  if (!board) {
    return <Loading loading={true} />;
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBard />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        handleCreateColumn={createColumn}
        handleCreateCard={createCard}
        moveColumns={moveColumns}
        handleCardSameColumn={moveCardInSameColumn}
        handleCardOtherColumns={handleCardOtherColumns}
      />
      s
    </Container>
  );
}

export default Board;
