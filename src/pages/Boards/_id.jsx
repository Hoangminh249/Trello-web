import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AppBard from "~/components/AppBard/AppBard";
import { fetchBoardDetails } from "../../api";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // react-router-dom
    const boardId = "65fc1bef2d698afc708ef029";
    fetchBoardDetails(boardId).then((board) => setBoard(board));
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBard />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}

export default Board;
