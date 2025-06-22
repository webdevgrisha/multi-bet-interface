import React from "react";
import { PendingBetsContext } from "./PendingBetsContext";

function usePendingBetsContext() {
  const context = React.useContext(PendingBetsContext);

  if (!context) {
    throw new Error("usePendingBetsContext must be used within PendingBetsProvider");
  }

  return context;
}

export { usePendingBetsContext };
