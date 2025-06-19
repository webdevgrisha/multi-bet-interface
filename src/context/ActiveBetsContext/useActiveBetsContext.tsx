import React from "react";
import { ActiveBetsContext } from "./ActiveBetsContext";

function useActiveBetsContext() {
  const context = React.useContext(ActiveBetsContext);

  if (!context) {
    throw new Error("useSportContext must be used within SportProvider");
  }

  return context;
}

export { useActiveBetsContext };
