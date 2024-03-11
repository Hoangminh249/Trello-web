import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

function App() {
  return (
    <>
      <main>
        <h1>Hoang minh</h1>
        <Typography variant="body2" color={"text.secondary"}>
          Age : 20
        </Typography>
        <Button variant="contained" color="success">Hello world</Button>
        <Button variant="outlined">Hello world</Button>
        <Button variant="text">Hello world</Button>
      </main>
    </>
  );
}

export default App;
