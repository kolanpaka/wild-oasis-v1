import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ReactQuery from "./ReactQuery";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactQuery>
      <App />
    </ReactQuery>
  </StrictMode>,
);
