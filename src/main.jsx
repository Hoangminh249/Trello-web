import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import theme from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer theme={"colored"}/>
    </CssVarsProvider>
);
