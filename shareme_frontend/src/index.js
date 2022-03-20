import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Router>
        <App />
      </Router>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
