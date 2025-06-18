import React from "react";
import { BetContext } from "./BetContext";

function useBetContext() {
  const context = React.useContext(BetContext);

  if (!context) {
    throw new Error("useSportContext must be used within SportProvider");
  }

  return context;
}

export { useBetContext };
