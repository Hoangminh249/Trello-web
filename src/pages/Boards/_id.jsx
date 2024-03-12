import React from "react";
import { Container } from "@mui/material";
import AppBard from "../../components/AppBard";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBard />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}

export default Board;
