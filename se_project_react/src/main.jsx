import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoggedInWrapper } from "./components/App/LoggedInWrapper/LoggedInWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoggedInWrapper>
        <App />
      </LoggedInWrapper>
    </BrowserRouter>
  </StrictMode>
);
