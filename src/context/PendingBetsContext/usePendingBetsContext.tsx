import React from "react";
import { PendingBetsContext } from "./PendingBetsContext";

function usePendingBetsContext() {
  const context = React.useContext(PendingBetsContext);

  if (!context) {
    throw new Error("useSportContext must be used within SportProvider");
  }

  return context;
}

export { usePendingBetsContext };
