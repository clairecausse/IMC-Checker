import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HistoryProvider } from "./context/HistoryProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>
);
