import React from "react";
import { ActiveBetsContext } from "./ActiveBetsContext";

function useActiveBetsContext() {
  const context = React.useContext(ActiveBetsContext);

  if (!context) {
    throw new Error("useActiveBetsContext must be used within ActiveBetsProvider");
  }

  return context;
}

export { useActiveBetsContext };
