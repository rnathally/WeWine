import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./Estilos/global.css";
import App from "./App.tsx";

// IMPORTANTE: importe o AuthProvider
import { AuthProvider } from "./contexto/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>         {/* ⬅ ENVOLVER TUDO AQUI */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
