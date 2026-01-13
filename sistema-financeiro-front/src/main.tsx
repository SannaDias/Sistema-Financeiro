import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*BrowserRouter habilita navegação por rotas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
