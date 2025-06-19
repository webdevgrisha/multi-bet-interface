import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./reset.css";
import { SportProvider } from "./context/SportContext/SportProvider.tsx";
import { PendingBetsProvider } from "./context/PendingBetsContext/PendingBetsProvider.tsx";
import { BalanceProvider } from "./context/BalanceContext/BalanceProvider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./router/createRoutes.tsx";
import { ActiveBetsProvider } from "./context/ActiveBetsContext/ActiveBetsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BalanceProvider>
      <ActiveBetsProvider>
        <SportProvider>
          <PendingBetsProvider>
            <RouterProvider router={router} />
          </PendingBetsProvider>
        </SportProvider>
      </ActiveBetsProvider>
    </BalanceProvider>
  </StrictMode>
);
