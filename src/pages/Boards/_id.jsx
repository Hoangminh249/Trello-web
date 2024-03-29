import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AppBard from "~/components/AppBard/AppBard";
import { createNewColumn, fetchBoardDetails, createNewCard } from "../../api";
import { mockData } from "../../mock/mock-data";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

function Board() {
  const [board, setBoard] = useState(null);

  const createColumn = async (newColumnData) => {
    const columnData = await createNewColumn({
      ...newColumnData,
      boardId: board._id,
    });
    console.log(columnData, "columnData");
  };

  const createCard = async (newCardData) => {
    const cardData = await createNewCard({
      ...newCardData,
      boardId: board._id,
    });
    console.log(cardData, "cardData");
  };

  useEffect(() => {
    // react-router-dom
    const boardId = "65fc1bef2d698afc708ef029";
    fetchBoardDetails(boardId).then((board) => setBoard(board));
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBard />
      <BoardBar board={board} />
      <BoardContent board={board} handleCreateColumn={createColumn} handleCreateCard={createCard}/>
    </Container>
  );
}

export default Board;
