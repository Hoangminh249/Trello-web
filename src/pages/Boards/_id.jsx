import React from "react";
import { Container } from "@mui/material";
import AppBard from "~/components/AppBard/AppBard";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/api/mock/mock-data";

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBard />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
}

export default Board;
