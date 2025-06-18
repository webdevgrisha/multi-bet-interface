import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./reset.css";
import App from "./App.tsx";
import { SportProvider } from "./context/SportContext/SportProvider.tsx";
import { BetProvider } from "./context/BetContext/BetProvider.tsx";
import { BalanceProvider } from "./context/BalanceContext/BalanceProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BalanceProvider>
      <SportProvider>
        <BetProvider>
          <App />
        </BetProvider>
      </SportProvider>
    </BalanceProvider>
  </StrictMode>
);
